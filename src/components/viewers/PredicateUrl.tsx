import { UrlString } from "@inrupt/solid-client";
import { FC, MouseEventHandler } from "react";
import { toast } from "react-toastify";
import { MdContentCopy } from "react-icons/md";
import { useL10n } from "../../hooks/l10n";

interface Props {
  url: UrlString;
}

export const PredicateUrl: FC<Props> = (props) => {
  const importantSeparatorIndex = Math.max(
    props.url.lastIndexOf("/"),
    props.url.lastIndexOf("#"),
  );
  const noise = props.url.substring(0, importantSeparatorIndex + 1);
  const signal = props.url.substring(importantSeparatorIndex + 1);
  const l10n = useL10n();

  const copyPredicateUrl: MouseEventHandler = async (event) => {
    event.preventDefault();
    await navigator.clipboard.writeText(noise + signal);
    toast(l10n.getString("predicate-urlcopy-toast-success"), { type: "info" });
  };
  const clipboardLink = (
    <a
      href={noise + signal}
      title={l10n.getString("predicate-urlcopy-button-tooltip")}
      aria-hidden="true"
      onClick={copyPredicateUrl}
      className="rounded p-2 text-gray-400 hover:text-gray-700 focus:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700"
    >
      <MdContentCopy className="inline-block" />
    </a>
  );

  return (
    <>
      <abbr title={noise + signal}>{signal}</abbr>
      {clipboardLink}
    </>
  );
};
