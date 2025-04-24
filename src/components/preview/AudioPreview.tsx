import { UrlString } from "@inrupt/solid-client";
import React, { FC } from "react";
import { ClientLocalized } from "../ClientLocalized";
import { SectionHeading } from "../ui/headings";

interface Props {
  fileUrl: UrlString;
  objectUrl: UrlString;
}

export const AudioPreview: FC<Props> = (props) => {
  const fileName = props.fileUrl.substring(props.fileUrl.lastIndexOf("/") + 1);

  return (
    <>
      <div className="pb-10">
        <ClientLocalized id="preview-audio-heading">
          <SectionHeading>Audio Preview</SectionHeading>
        </ClientLocalized>
        <ClientLocalized
          id="preview-audio-error-playback"
          vars={{ filename: fileName }}
          elems={{
            "download-link": <a href={props.objectUrl} download={true} />,
          }}
        >
          <audio src={props.objectUrl} className="w-full" controls={true}>
            Unfortunately your browser cannot provide a preview of `{fileName}`.
            You can download it instead.
          </audio>
        </ClientLocalized>
      </div>
    </>
  );
};
