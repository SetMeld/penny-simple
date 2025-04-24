import Modal from "react-modal";
import { MdClose, MdDownload } from "react-icons/md";
import { FetchError, UrlString } from "@inrupt/solid-client";
import { Button } from "../ui/forms";
import { useL10n } from "../../hooks/l10n";
import { ProgressBar } from "../ui/ProgressBar";

interface Props {
  isOpen: boolean;
  done: boolean;
  onCancel: () => void;
  containerPath: UrlString;
  discoveredItems: number;
  downloadedItems: number;
  downloadedBytes: number;
  failedDownloads: { name: string; error?: FetchError }[];
  zippedContainer: Uint8Array | null;
}

// Display zip download state and allow cancelling
export const ZipDownloadModal = (props: Props) => {
  const l10n = useL10n();
  const containerName = props.containerPath.split("/").slice(-2)[0];

  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.onCancel}
      contentLabel={l10n.getString("container-download-modal-heading", {
        containerName: containerName,
      })}
      overlayClassName={{
        base: "transition-opacity duration-150 motion-safe:opacity-0 bg-opacity-90 bg-gray-900 p-5 md:py-20 md:px-40 lg:px-60 xl:px-96 fixed top-0 left-0 right-0 bottom-0 overscroll-contain",
        afterOpen: "motion-safe:opacity-100",
        beforeClose: "",
      }}
      className={{
        base: "mx-auto rounded bg-white p-5 shadow-lg transition-opacity duration-150 motion-safe:opacity-0 md:p-10",
        afterOpen: "motion-safe:opacity-100",
        beforeClose: "",
      }}
    >
      <div className="-mr-4 -mt-4 flex flex-row-reverse md:-mr-8 md:-mt-8">
        <button onClick={props.onCancel}>
          <MdClose
            aria-label={l10n.getString("container-download-modal-close")}
          />
        </button>
      </div>
      <h2 className="pb-2 text-2xl">
        {l10n.getString("container-download-modal-heading", {
          containerName: containerName,
        })}
      </h2>
      <div className="flex flex-col gap-3">
        {props.zippedContainer !== null ? (
          <div className="flex justify-center p-5">
            <a
              className="flex flex-col items-center rounded px-10 py-5 text-center text-2xl hover:bg-gray-700 hover:text-white hover:underline"
              href={URL.createObjectURL(
                new Blob([props.zippedContainer], { type: "application/zip" }),
              )}
              download={containerName + ".zip"}
            >
              <MdDownload className="text-9xl" aria-hidden />
              {l10n.getString("container-download-modal-save-label", {
                containerName: containerName + ".zip",
              })}
            </a>
          </div>
        ) : props.downloadedItems === 0 ? (
          <>
            <ProgressBar
              label={l10n.getString(
                "container-download-modal-progress-discovering",
                { discoveredItems: props.discoveredItems },
              )}
            />
          </>
        ) : (
          <>
            <ProgressBar
              label={l10n.getString(
                "container-download-modal-progress-zipping",
                {
                  downloadedItems: props.downloadedItems,
                  total: props.discoveredItems,
                },
              )}
              maxValue={props.discoveredItems}
              value={props.downloadedItems}
            />
          </>
        )}

        {props.failedDownloads.length > 0 && (
          <details className="p-2">
            <summary tabIndex={0} className="-ml-2 mb-1 rounded p-2 text-xl">
              {l10n.getString("container-download-modal-skipped-heading", {
                count: props.failedDownloads.length,
              })}
            </summary>
            <ul className="max-h-48 list-disc overflow-y-scroll pl-4">
              {props.failedDownloads.map(({ name, error }) => {
                const reason =
                  error?.statusCode === 404
                    ? l10n.getString(
                        "container-download-modal-skipped-reason-not-found",
                      )
                    : error?.statusCode === 403
                    ? l10n.getString(
                        "container-download-modal-skipped-reason-inaccessible",
                      )
                    : null;
                return (
                  <li key={name + error?.statusCode + error?.message}>
                    <span className="font-mono">
                      {name.substring(props.containerPath.length)}
                    </span>
                    {reason !== null ? <> ({reason})</> : null}
                  </li>
                );
              })}
            </ul>
          </details>
        )}
      </div>
    </Modal>
  );
};
