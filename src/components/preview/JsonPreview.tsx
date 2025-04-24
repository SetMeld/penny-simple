import React, {
  FC,
  FormEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import { MdCheck } from "react-icons/md";
import { ClientLocalized } from "../ClientLocalized";
import { SectionHeading } from "../ui/headings";
import { LoadedCachedFileData } from "../../hooks/file";
import { Spinner } from "../ui/Spinner";
import { HasAccess } from "../HasAccess";
import { useL10n } from "../../hooks/l10n";

interface Props {
  file: LoadedCachedFileData;
}

export const JsonPreview: FC<Props> = (props) => {
  const l10n = useL10n();
  const [formContent, setFormContent] = useState<string>();
  const [fileContent, setFileContent] = useState<string>();

  useEffect(() => {
    props.file.data.blob.text().then((textContent) => {
      try {
        setFileContent(JSON.stringify(JSON.parse(textContent), null, 2));
      } catch (e) {
        // Do nothing; the server should reject invalid JSON from ever getting
        // saved, so if we encounter invalid JSON here, it's because of an
        // optimistic update while saving.
      }
    });
  }, [props.file]);

  if (!fileContent) {
    return <Spinner />;
  }

  const saveChanges: FormEventHandler = (event) => {
    event.preventDefault();
    const oldContent = fileContent;
    const undo = () => {
      props.file.save(new Blob([oldContent]));
      setFormContent(undefined);
    };
    props.file
      .save(new Blob([formContent ?? fileContent]))
      .then(() => {
        toast(
          <ClientLocalized
            id="preview-json-update-toast-success"
            elems={{
              "undo-button": (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    undo();
                  }}
                  className="underline hover:no-underline focus:no-underline"
                />
              ),
            }}
          >
            <span>Saved.</span>
          </ClientLocalized>,
          { type: "info" },
        );
      })
      .catch(() => {
        toast(
          <ClientLocalized id="preview-json-update-toast-error">
            <span>There was an error saving your JSON.</span>
          </ClientLocalized>,
          { type: "error" },
        );
      });
  };

  const fallback = (
    <pre className="h-96 w-full overflow-scroll rounded border-4 border-gray-700 p-2 font-mono">
      {fileContent}
    </pre>
  );

  return (
    <>
      <div className="pb-10">
        <ClientLocalized id="preview-json-heading">
          <SectionHeading>File Contents</SectionHeading>
        </ClientLocalized>
        <HasAccess
          access={["write"]}
          resource={props.file.data}
          fallback={fallback}
        >
          <form onSubmit={saveChanges} className="space-y-5">
            {/* Why 60 characters: https://baymard.com/blog/line-length-readability */}
            <textarea
              cols={60}
              rows={20}
              className="h-96 w-full overflow-scroll rounded border-4 border-gray-700 p-2 font-mono"
              onChange={(e) => {
                e.preventDefault();
                setFormContent(e.target.value);
              }}
              value={formContent ?? fileContent}
            />
            <div className="grid gap-5 pb-5 sm:grid-cols-2">
              <button
                type="submit"
                className="flex items-center space-x-2 rounded border-4 border-gray-700 p-5 text-lg text-gray-700 hover:bg-gray-700 hover:text-white focus:bg-gray-700 focus:text-white focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-opacity-50 focus:ring-offset-2"
              >
                <MdCheck aria-hidden="true" />
                <span>{l10n.getString("preview-json-save-button")}</span>
              </button>
            </div>
          </form>
        </HasAccess>
      </div>
    </>
  );
};
