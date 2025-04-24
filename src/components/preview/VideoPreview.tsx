import { UrlString } from "@inrupt/solid-client";
import React, { FC } from "react";
import { ClientLocalized } from "../ClientLocalized";
import { SectionHeading } from "../ui/headings";

interface Props {
  fileUrl: UrlString;
  objectUrl: UrlString;
}

export const VideoPreview: FC<Props> = (props) => {
  const fileName = props.fileUrl.substring(props.fileUrl.lastIndexOf("/") + 1);

  return (
    <>
      <div className="pb-10">
        <ClientLocalized id="preview-video-heading">
          <SectionHeading>Video Preview</SectionHeading>
        </ClientLocalized>
        <ClientLocalized
          id="preview-video-error-playback"
          vars={{ filename: fileName }}
          elems={{
            "download-link": <a href={props.objectUrl} download={true} />,
          }}
        >
          <video
            src={props.objectUrl}
            className="max-w-full rounded border-4 border-gray-700"
            controls={true}
          >
            Unfortunately your browser cannot provide a preview of `{fileName}`.
            You can download it instead.
          </video>
        </ClientLocalized>
      </div>
    </>
  );
};
