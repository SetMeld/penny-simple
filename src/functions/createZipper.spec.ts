import { describe, it, expect } from "@jest/globals";
import { createZipper, extractZip, ZipItem } from "./createZipper";

jest.mock("fflate", () => {
  const originalModule = jest.requireActual("fflate");

  // AsyncZipDeflate uses Workers, which are not available in jest tests
  // ZipDeflate is the synchronous equivalent
  return {
    __esModule: true,
    ...originalModule,
    AsyncZipDeflate: originalModule.ZipDeflate,
  };
});

describe("zip", () => {
  it("can create a zip", async () => {
    const zipper = createZipper();
    zipper.addFile([], "root.txt", new Uint8Array([12, 34]));
    zipper.addFolder(["test"]);
    zipper.addFile(["test"], "child.txt", new Uint8Array([56, 78, 90]));
    zipper.addFolder(["test", "nested"]);
    zipper.addFolder(["test", "nested", "empty"]);

    const zip = await zipper.createZip();

    expect(zip.length).toBeGreaterThan(0);
  });

  it("can extract a zip", async () => {
    // zip copied from the previous test output
    const zip = new Uint8Array([
      80, 75, 3, 4, 20, 0, 0, 0, 8, 0, 146, 73, 92, 90, 23, 28, 12, 56, 4, 0, 0,
      0, 2, 0, 0, 0, 8, 0, 0, 0, 114, 111, 111, 116, 46, 116, 120, 116, 227, 81,
      2, 0, 80, 75, 3, 4, 20, 0, 0, 0, 8, 0, 146, 73, 92, 90, 0, 0, 0, 0, 2, 0,
      0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 116, 101, 115, 116, 47, 3, 0, 80, 75, 3, 4,
      20, 0, 0, 0, 8, 0, 146, 73, 92, 90, 91, 183, 125, 48, 5, 0, 0, 0, 3, 0, 0,
      0, 14, 0, 0, 0, 116, 101, 115, 116, 47, 99, 104, 105, 108, 100, 46, 116,
      120, 116, 179, 240, 139, 2, 0, 80, 75, 3, 4, 20, 0, 0, 0, 8, 0, 146, 73,
      92, 90, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 116, 101, 115,
      116, 47, 110, 101, 115, 116, 101, 100, 47, 3, 0, 80, 75, 3, 4, 20, 0, 0,
      0, 8, 0, 146, 73, 92, 90, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 18, 0, 0, 0,
      116, 101, 115, 116, 47, 110, 101, 115, 116, 101, 100, 47, 101, 109, 112,
      116, 121, 47, 3, 0, 80, 75, 1, 2, 20, 0, 20, 0, 0, 0, 8, 0, 146, 73, 92,
      90, 23, 28, 12, 56, 4, 0, 0, 0, 2, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 114, 111, 111, 116, 46, 116, 120, 116, 80, 75, 1,
      2, 20, 0, 20, 0, 0, 0, 8, 0, 146, 73, 92, 90, 0, 0, 0, 0, 2, 0, 0, 0, 0,
      0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 42, 0, 0, 0, 116, 101,
      115, 116, 47, 80, 75, 1, 2, 20, 0, 20, 0, 0, 0, 8, 0, 146, 73, 92, 90, 91,
      183, 125, 48, 5, 0, 0, 0, 3, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 79, 0, 0, 0, 116, 101, 115, 116, 47, 99, 104, 105, 108, 100, 46,
      116, 120, 116, 80, 75, 1, 2, 20, 0, 20, 0, 0, 0, 8, 0, 146, 73, 92, 90, 0,
      0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 128, 0, 0, 0, 116, 101, 115, 116, 47, 110, 101, 115, 116, 101, 100, 47,
      80, 75, 1, 2, 20, 0, 20, 0, 0, 0, 8, 0, 146, 73, 92, 90, 0, 0, 0, 0, 2, 0,
      0, 0, 0, 0, 0, 0, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 172, 0, 0, 0,
      116, 101, 115, 116, 47, 110, 101, 115, 116, 101, 100, 47, 101, 109, 112,
      116, 121, 47, 80, 75, 5, 6, 0, 0, 0, 0, 5, 0, 5, 0, 31, 1, 0, 0, 222, 0,
      0, 0, 0, 0,
    ]);

    const unzipped = await extractZip(zip);

    const items = unzipped.items();
    const expectedItems: ZipItem[] = [
      {
        type: "file",
        parent: [],
        name: "root.txt",
      },
      {
        type: "container",
        path: ["test"],
      },
      {
        type: "file",
        parent: ["test"],
        name: "child.txt",
      },
      {
        type: "container",
        path: ["test", "nested"],
      },
      {
        type: "container",
        path: ["test", "nested", "empty"],
      },
    ];
    expect(items).toEqual(expect.arrayContaining(expectedItems));
    expect(expectedItems).toEqual(expect.arrayContaining(items));

    expect(unzipped.file([], "root.txt")).toEqual(new Uint8Array([12, 34]));
    expect(unzipped.file(["test"], "child.txt")).toEqual(
      new Uint8Array([56, 78, 90]),
    );
  });

  it("produces the original data when zipping and unzipping", async () => {
    const zipper = createZipper();
    zipper.addFile([], "root.txt", new Uint8Array([12, 34]));
    zipper.addFolder(["test"]);
    zipper.addFile(["test"], "child.txt", new Uint8Array([56, 78, 90]));
    zipper.addFolder(["test", "nested"]);
    zipper.addFolder(["test", "nested", "empty"]);

    const zip = await zipper.createZip();
    const unzipped = await extractZip(zip);

    const items = unzipped.items();
    const expectedItems: ZipItem[] = [
      {
        type: "file",
        parent: [],
        name: "root.txt",
      },
      {
        type: "container",
        path: ["test"],
      },
      {
        type: "file",
        parent: ["test"],
        name: "child.txt",
      },
      {
        type: "container",
        path: ["test", "nested"],
      },
      {
        type: "container",
        path: ["test", "nested", "empty"],
      },
    ];
    expect(items).toEqual(expect.arrayContaining(expectedItems));
    expect(expectedItems).toEqual(expect.arrayContaining(items));

    expect(unzipped.file([], "root.txt")).toEqual(new Uint8Array([12, 34]));
    expect(unzipped.file(["test"], "child.txt")).toEqual(
      new Uint8Array([56, 78, 90]),
    );
  });
});
