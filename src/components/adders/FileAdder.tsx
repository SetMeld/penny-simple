import { FC, useId } from "react";
import { MdFileUpload } from "react-icons/md";
import {
  FetchError,
  getSourceUrl,
  saveFileInContainer,
} from "@inrupt/solid-client";
import { fetch } from "@inrupt/solid-client-authn-browser";
import { useSessionInfo } from "../../hooks/sessionInfo";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { LoadedCachedDataset } from "../../hooks/dataset";
import { useL10n } from "../../hooks/l10n";

interface Props {
  container: LoadedCachedDataset;
}

export const FileAdder: FC<Props> = (props) => {
  const sessionInfo = useSessionInfo();
  const l10n = useL10n();
  const inputId = useId();

  const onDrop: DropzoneOptions["onDrop"] = async (selectedFiles) => {
    try {
      await Promise.all(
        selectedFiles.map((file) => {
          return saveFileInContainer(getSourceUrl(props.container.data), file, {
            fetch: fetch,
            slug: file.name,
          });
        }),
      );
      props.container.mutate();
      toast(
        l10n.getString("file-add-toast-success", {
          fileCount: selectedFiles.length,
        }),
        { type: "info" },
      );
    } catch (e) {
      if (e instanceof FetchError && e.statusCode === 403) {
        toast(l10n.getString("file-add-toast-error-not-allowed"), {
          type: "error",
        });
      } else {
        toast(
          l10n.getString("file-add-toast-error-other", {
            fileCount: selectedFiles.length,
          }),
          { type: "error" },
        );
      }
    }
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  if (!sessionInfo) {
    return null;
  }

  const dropTargetStyles = isDragActive
    ? "text-gray-900 border-gray-900 bg-gray-100"
    : "";
  return (
    <>
      <label
        htmlFor={inputId}
        {...getRootProps()}
        className={`${dropTargetStyles} flex cursor-pointer items-center space-x-2 rounded border-4 border-dashed border-gray-200 p-5 text-gray-500 hover:border-gray-900 hover:bg-gray-100 hover:text-gray-900 focus:border-gray-900 focus:text-gray-900 focus:outline-none`}
      >
        <MdFileUpload aria-hidden="true" className="text-3xl" />
        <span>
          {isDragActive
            ? l10n.getString("file-add-drop-target")
            : l10n.getString("file-add-button")}
        </span>
      </label>
      <input id={inputId} {...getInputProps()} />
    </>
  );
};
