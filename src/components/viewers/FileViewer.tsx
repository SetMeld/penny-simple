import React, { FC, MouseEventHandler, useState, type JSX } from "react";
import { MdFileDownload } from "react-icons/md";
import {
  deleteFile,
  FetchError,
  getContentType,
  getSourceUrl,
} from "@inrupt/solid-client";
import { fetch } from "@inrupt/solid-client-authn-browser";
import { SectionHeading } from "../ui/headings";
import { VscTrash } from "react-icons/vsc";
import { toast } from "react-toastify";
import { ConfirmOperation } from "../ConfirmOperation";
import { ImagePreview } from "../preview/ImagePreview";
import { AudioPreview } from "../preview/AudioPreview";
import { VideoPreview } from "../preview/VideoPreview";
import { TextPreview } from "../preview/TextPreview";
import { ClientLocalized } from "../ClientLocalized";
import { HasAccess } from "../HasAccess";
import { LoadedCachedFileData } from "../../hooks/file";
import { useL10n } from "../../hooks/l10n";
import { JsonPreview } from "../preview/JsonPreview";
import { LinkedResourcesViewer } from "./LinkedResourcesViewer";

interface Props {
  file: LoadedCachedFileData;
}

export const FileViewer: FC<Props> = (props) => {
  const fileUrl = getSourceUrl(props.file.data);
  const [isRequestingDeletion, setIsRequestingDeletion] = useState(false);
  const fileName = fileUrl.substring(fileUrl.lastIndexOf("/") + 1);
  const l10n = useL10n();

  const blobUrl = URL.createObjectURL(props.file.data.blob);

  const boxClasses =
    "w-full md:w-1/2 p-5 rounded bg-gray-700 text-white flex items-center space-x-2 text-lg";
  const buttonClasses =
    boxClasses +
    " hover:bg-gray-900 focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 focus:outline-none focus:ring-opacity-50";

  const onConfirmDelete = async () => {
    try {
      await deleteFile(fileUrl, { fetch: fetch });
      toast(l10n.getString("file-delete-toast-success"), { type: "info" });
      props.file.mutate();
    } catch (e) {
      if (e instanceof FetchError && e.statusCode === 403) {
        toast(l10n.getString("file-delete-toast-error-not-allowed"), {
          type: "error",
        });
      } else {
        toast(l10n.getString("file-delete-toast-error-other"), {
          type: "error",
        });
      }
    }
  };

  const deletionModal = isRequestingDeletion ? (
    <ConfirmOperation
      confirmString={decodeURIComponent(fileName)}
      onConfirm={onConfirmDelete}
      onCancel={() => setIsRequestingDeletion(false)}
    >
      <ClientLocalized id="file-delete-confirm-heading">
        <h2 className="pb-2 text-2xl">Are you sure?</h2>
      </ClientLocalized>
      <ClientLocalized id="file-delete-confirm-lead">
        Are you sure you want to delete this file? This can not be undone.
      </ClientLocalized>
    </ConfirmOperation>
  ) : null;

  const onDeleteFile: MouseEventHandler = (event) => {
    event.preventDefault();

    setIsRequestingDeletion(true);
  };

  let preview: JSX.Element | null = null;
  const contentType = getContentType(props.file.data);
  const contentTypeParts = contentType?.split("/");
  if (Array.isArray(contentTypeParts) && contentTypeParts.length === 2) {
    if (contentTypeParts[0] === "image") {
      preview = <ImagePreview fileUrl={fileUrl} objectUrl={blobUrl} />;
    }
    if (contentTypeParts[0] === "audio") {
      preview = <AudioPreview fileUrl={fileUrl} objectUrl={blobUrl} />;
    }
    if (contentTypeParts[0] === "video") {
      preview = <VideoPreview fileUrl={fileUrl} objectUrl={blobUrl} />;
    }
    if (contentTypeParts[0] === "text") {
      preview = <TextPreview file={props.file} />;
    }
    if (contentType === "application/json") {
      preview = <JsonPreview file={props.file} />;
    }
  }

  return (
    <>
      <div className="pb-10">
        <ClientLocalized id="file-heading">
          <SectionHeading>File</SectionHeading>
        </ClientLocalized>
        <a
          href={blobUrl}
          title={l10n.getString("file-download-button-tooltip", {
            filename: fileName,
          })}
          className={buttonClasses}
          download={fileName}
        >
          <MdFileDownload className="text-2xl" aria-hidden="true" />
          <ClientLocalized id="file-download-button">
            <span>Download</span>
          </ClientLocalized>
        </a>
      </div>
      {preview}
      <LinkedResourcesViewer dataset={props.file} />
      <HasAccess access={["write"]} resource={props.file.data}>
        <div className="pb-10">
          <ClientLocalized id="danger-zone-heading">
            <SectionHeading>Danger Zone</SectionHeading>
          </ClientLocalized>
          {deletionModal}
          <button
            className="flex w-full items-center space-x-2 rounded border-4 border-red-700 p-5 text-lg text-red-700 hover:bg-red-700 hover:text-white focus:bg-red-700 focus:text-white focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-50 focus:ring-offset-2 md:w-1/2"
            onClick={onDeleteFile}
          >
            <VscTrash aria-hidden="true" />
            <ClientLocalized id="file-delete">
              <span>Delete file</span>
            </ClientLocalized>
          </button>
        </div>
      </HasAccess>
    </>
  );
};
