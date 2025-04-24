import { UrlString } from "@inrupt/solid-client";
import React, { FC, MouseEventHandler, useState } from "react";
import { useL10n } from "../../hooks/l10n";
import { ClientLocalized } from "../ClientLocalized";
import { SectionHeading } from "../ui/headings";
import { Modal } from "../ui/modal";

interface Props {
  fileUrl: UrlString;
  objectUrl: UrlString;
}

export const ImagePreview: FC<Props> = (props) => {
  const fileName = props.fileUrl.substring(props.fileUrl.lastIndexOf("/") + 1);
  const [modalPreview, setModalPreview] = useState(false);
  const l10n = useL10n();

  const openPreviewModal: MouseEventHandler = (event) => {
    event.preventDefault();

    setModalPreview(true);
  };

  return (
    <>
      <div className="pb-10">
        <ClientLocalized id="preview-image-heading">
          <SectionHeading>Image Preview</SectionHeading>
        </ClientLocalized>
        <a
          href={props.objectUrl}
          title={l10n.getString("preview-image-thumbnail-tooltip")}
          onClick={openPreviewModal}
          className="inline-block rounded hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2"
        >
          <img
            src={props.objectUrl}
            alt={l10n.getString("preview-image-alt", { filename: fileName })}
            className="max-w-full rounded border-4 border-gray-700"
          />
        </a>
        <Modal
          isOpen={modalPreview}
          onRequestClose={() => setModalPreview(false)}
          contentLabel={l10n.getString("preview-image-heading")}
        >
          <img
            src={props.objectUrl}
            alt={l10n.getString("preview-image-alt", { filename: fileName })}
            className="mx-auto"
          />
        </Modal>
      </div>
    </>
  );
};
