import { FC, useEffect, useState } from "react";
import { MdDownload } from "react-icons/md";
import { FetchError, getSourceUrl, isContainer } from "@inrupt/solid-client";
import { LoadedCachedDataset } from "../../hooks/dataset";
import { useL10n } from "../../hooks/l10n";
import { downloadAsZip } from "../../functions/downloadAsZip";
import { ZipDownloadModal } from "./ZipDownloadModal";
import { toast } from "react-toastify";
import { useSessionInfo } from "../../hooks/sessionInfo";

interface Props {
  container: LoadedCachedDataset;
}

/** Button to download the container as a zip file.
 * This component calls the downloadAsZip function and
 * displays the current state via the ZipDownloadModal.
 */
export const ZipRetriever: FC<Props> = (props) => {
  const l10n = useL10n();
  const sessionInfo = useSessionInfo();
  const [discoveredItems, setDiscoveredItems] = useState<number>(0);
  const [downloadedItems, setDownloadedItems] = useState<number>(0);
  const [downloadedBytes, setDownloadedBytes] = useState<number>(0);
  const [failedDownloads, setFailedDownloads] = useState<
    { name: string; error?: FetchError }[]
  >([]);
  const [cancelDownload, setCancelDownload] = useState<null | (() => void)>(
    null,
  );
  const [zippedContainer, setZippedContainer] = useState<Uint8Array | null>(
    null,
  );

  const containerPath = getSourceUrl(props.container.data);
  const containerName = containerPath.split("/").slice(-2)[0];

  const inProgress = cancelDownload !== null;
  const modalIsOpen = inProgress || failedDownloads.length > 0;

  const download = async () => {
    // allow user cancellation
    const abortController = new AbortController();
    const abortSignal = abortController.signal;
    setCancelDownload((prev) => {
      prev?.();
      return () => abortController.abort("Zipping has been cancelled.");
    });

    try {
      const zip = await downloadAsZip(props.container.data, {
        currentWebId: sessionInfo?.webId,
        onItemDiscovered: (url) => {
          if (!isContainer(url)) {
            setDiscoveredItems((prev) => prev + 1);
          }
        },
        onItemDownloaded: (url, { bytes }) => {
          setDownloadedItems((prev) => prev + 1);
          setDownloadedBytes((prev) => prev + bytes);
        },
        onItemDiscoveryError: (url, error) =>
          setFailedDownloads((prev) => [
            ...prev,
            {
              name: url,
              error: error instanceof FetchError ? error : undefined,
            },
          ]),
        onItemDownloadError: (url, error) =>
          setFailedDownloads((prev) => {
            return [
              ...prev,
              {
                name: url,
                error: error instanceof FetchError ? error : undefined,
              },
            ];
          }),
        abortSignal,
      });
      setZippedContainer(zip);
    } catch (err) {
      console.error("Zipping stopped", err);
      if (abortSignal.aborted) {
        reset();
      } else {
        toast(
          l10n.getString("container-download-toast-error-unkown", {
            containerName,
          }),
          { type: "error" },
        );
      }
    }
  };

  useEffect(() => {
    if (!inProgress && failedDownloads.length === 0) {
      reset();
    }
  }, [failedDownloads.length, inProgress]);

  const reset = () => {
    setDiscoveredItems(0);
    setDownloadedItems(0);
    setDownloadedBytes(0);
    setFailedDownloads([]);
    setCancelDownload(null);
    setZippedContainer(null);
  };
  const cancel = () => {
    cancelDownload?.();
    reset();
  };

  return (
    <>
      <button
        className="flex items-center rounded p-2 text-gray-700 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-700"
        title={l10n.getString("container-download-tooltip")}
        onClick={(e) => {
          e.preventDefault();
          download();
        }}
      >
        <MdDownload
          aria-label={l10n.getString("container-download-label")}
          className="text-2xl"
        />
      </button>
      <ZipDownloadModal
        isOpen={modalIsOpen}
        done={!inProgress}
        onCancel={cancel}
        containerPath={containerPath}
        discoveredItems={discoveredItems}
        downloadedItems={downloadedItems}
        downloadedBytes={downloadedBytes}
        failedDownloads={failedDownloads}
        zippedContainer={zippedContainer}
      />
    </>
  );
};

const downloadBlob = (data: Uint8Array, fileName: string, type: string) => {
  const url = window.URL.createObjectURL(new Blob([data], { type }));
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
};
