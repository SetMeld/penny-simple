import { AsyncZipDeflate, unzip, Unzipped, Zip } from "fflate";

// factory function to hide which zip library we used for the library
export const createZipper: () => Zipper = () => new FFlateZipper();

export type Zipper = {
  /**
   * Add a folder to the zip.
   * @param path e.g. ['some', 'test'] for /some/test/
   */
  addFolder(path: string[]): void;

  /**
   * Add a file to the zip.
   * @param parent already existing containing folder, e.g. ['some', 'test'] to add the file under /some/test/
   * @param name
   * @param content file content. This array should only be accessed by the zipper.
   */
  addFile(parent: string[], name: string, content: Uint8Array): void;

  /**
   * Create a zip of all added files and folders.
   * Only use once.
   */
  createZip(): Promise<Uint8Array>;

  /**
   * Cancel zip creation. Rejects the createZip promise if in process. Does nothing if currently not creating a zip.
   */
  cancel(): void;
};

class FFlateZipper implements Zipper {
  private zipper = new Zip();
  private zipChunks: Uint8Array[] = [];

  private promise: Promise<Uint8Array>;
  private resolve!: (zip: Uint8Array) => void;
  private reject!: (err: unknown) => void;

  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });

    this.zipper.ondata = (err, data, done) => {
      if (err) {
        this.reject(err);
      } else {
        this.zipChunks.push(data);
        if (done) {
          const zip = mergeUint8Arrays(this.zipChunks);
          this.resolve(zip);
        }
      }
    };
  }

  addFolder(path: string[]): void {
    const folder = new AsyncZipDeflate(path.join("/") + "/");
    this.zipper.add(folder);
    folder.push(new Uint8Array(), true);
  }

  addFile(parent: string[], name: string, content: Uint8Array): void {
    const parentPath = parent.length ? parent.join("/") + "/" : "";
    const path = parentPath + name;

    const file = new AsyncZipDeflate(path);
    this.zipper.add(file);
    file.push(content, true);
  }

  createZip(): Promise<Uint8Array> {
    this.zipper.end();
    return this.promise;
  }

  cancel(): void {
    this.zipper.terminate();
    this.reject(new Error(`Cancelled zip creaction.`));
  }
}

export type ZipItem =
  | {
      readonly type: "file";
      readonly parent: string[];
      readonly name: string;
    }
  | {
      readonly type: "container";
      readonly path: string[];
    };

export type ExtractedZip = {
  items(): readonly ZipItem[];
  file(parent: string[], name: string): Uint8Array;
};

class FFlateExtractedZip implements ExtractedZip {
  private _items: ZipItem[] = [];
  private data: Unzipped;

  constructor(data: Unzipped) {
    this.data = data;
    for (const key of Object.keys(data)) {
      const path = key.split("/").filter((s) => s !== "");
      if (key.endsWith("/")) {
        this._items.push({ type: "container", path });
      } else {
        this._items.push({
          type: "file",
          parent: path.slice(0, -1),
          name: path[path.length - 1],
        });
      }
    }
  }

  items(): readonly ZipItem[] {
    return this._items;
  }

  file(parent: string[], name: string): Uint8Array {
    let path = parent.join("/") + "/" + name;
    if (path.startsWith("/")) {
      path = path.slice(1);
    }

    if (!(path in this.data)) {
      throw new Error(`Could not find extracted file ${path}.`);
    }
    return this.data[path];
  }
}

export const extractZip: (zip: Uint8Array) => Promise<ExtractedZip> = async (
  zip,
) => {
  return new Promise((resolve, reject) => {
    unzip(zip, {}, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(new FFlateExtractedZip(data));
      }
    });
  });
};

const mergeUint8Arrays = (arrays: Uint8Array[]): Uint8Array => {
  const size = arrays.reduce((size, arr) => size + arr.length, 0);
  const result = new Uint8Array(size);

  let offset = 0;
  for (const arr of arrays) {
    result.set(arr, offset);
    offset += arr.length;
  }

  return result;
};
