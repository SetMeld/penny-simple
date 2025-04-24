import {
  addUrl,
  createAclFromFallbackAcl,
  createSolidDataset,
  createThing,
  getLinkedResourceUrlAll,
  getSolidDatasetWithAcl,
  getSourceUrl,
  hasAccessibleAcl,
  hasFallbackAcl,
  hasServerResourceInfo,
  saveAclFor,
  setThing,
  UrlString,
} from "@inrupt/solid-client";
import { fetch } from "@inrupt/solid-client-authn-browser";
import Link from "next/link";
import { rdf, acl } from "rdf-namespaces";
import React, { FC, useState } from "react";
import { MdAdd } from "react-icons/md";
import { toast } from "react-toastify";
import { getExplorePath } from "../../functions/integrate";
import { isLoadedDataset, LoadedCachedDataset } from "../../hooks/dataset";
import { useL10n } from "../../hooks/l10n";
import { useResource } from "../../hooks/resource";
import { useSessionInfo } from "../../hooks/sessionInfo";
import { ClientLocalized } from "../ClientLocalized";
import { SectionHeading } from "../ui/headings";
import { Spinner } from "../ui/Spinner";
import { LoadedCachedFileData } from "../../hooks/file";

interface Props {
  dataset: LoadedCachedDataset | LoadedCachedFileData;
}

export const LinkedResourcesViewer: FC<Props> = (props) => {
  const linkedResourceUrls = hasServerResourceInfo(props.dataset.data)
    ? getLinkedResourceUrlAll(props.dataset.data)
    : {};
  const acrUrl =
    linkedResourceUrls["http://www.w3.org/ns/solid/acp#accessControl"]?.[0] ??
    null;
  const sessionInfo = useSessionInfo();
  const acrDataset = useResource(acrUrl);
  const aclUrl = linkedResourceUrls.acl?.[0] ?? null;
  const aclDataset = useResource(aclUrl);
  const l10n = useL10n();
  const [isInitialisingAcl, setIsInitialisingAcl] = useState(false);

  const linkedResourceLabels: Record<UrlString, string> = {};

  // An ACL, even if linked, might not exist, so we try to fetch it before linking:
  // (Note that ESS lists an ACL as its own ACL, so ignore it in that case.)
  if (
    isLoadedDataset(aclDataset) &&
    aclUrl !== getSourceUrl(props.dataset.data)
  ) {
    linkedResourceLabels[aclUrl] = l10n.getString("linked-resources-acl-label");
  }
  // The current user might not have access to the ACR, so we try to fetch it before linking:
  if (isLoadedDataset(acrDataset)) {
    linkedResourceLabels[acrUrl] = l10n.getString("linked-resources-acr-label");
  }

  const resourceLinks = Object.keys(linkedResourceLabels).map(
    (linkedResourceUrl) => {
      return (
        <Link
          key={linkedResourceUrl}
          href={getExplorePath(linkedResourceUrl)}
          className="block rounded bg-gray-700 p-5 text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-opacity-50 focus:ring-offset-2"
        >
          {linkedResourceLabels[linkedResourceUrl]}
        </Link>
      );
    },
  );

  let initialisationLinks = [];
  // If no ACL exists, but the server does point to one, it can be initialised:
  if (
    sessionInfo &&
    !aclDataset.data &&
    aclUrl &&
    hasAccessibleAcl(props.dataset.data)
  ) {
    if (isInitialisingAcl) {
      initialisationLinks.push(
        <div
          key={`acl-initialiser-${getSourceUrl(props.dataset.data)}`}
          className="flex w-full items-center space-x-2 rounded border-4 border-dashed border-gray-200 p-5 text-gray-500"
        >
          <Spinner />
        </div>,
      );
    } else {
      const initialiseAcl = async () => {
        setIsInitialisingAcl(true);
        let firstControl = createThing();
        firstControl = addUrl(firstControl, rdf.type, acl.Authorization);
        firstControl = addUrl(
          firstControl,
          acl.accessTo,
          getSourceUrl(props.dataset.data),
        );
        firstControl = addUrl(firstControl, acl.mode, acl.Read);
        firstControl = addUrl(firstControl, acl.mode, acl.Write);
        firstControl = addUrl(firstControl, acl.mode, acl.Control);
        firstControl = addUrl(firstControl, acl.agent, sessionInfo!.webId);
        const resourceWithAcl = await getSolidDatasetWithAcl(
          getSourceUrl(props.dataset.data),
          { fetch: fetch },
        );
        if (!hasAccessibleAcl(resourceWithAcl)) {
          setIsInitialisingAcl(false);
          toast(
            l10n.getString("linked-resources-acl-add-toast-error-not-allowed"),
            { type: "error" },
          );
          return;
        }
        let newAcl = hasFallbackAcl(resourceWithAcl)
          ? createAclFromFallbackAcl(resourceWithAcl)
          : setThing(createSolidDataset(), firstControl);
        try {
          await saveAclFor(resourceWithAcl, newAcl, { fetch: fetch });
          aclDataset.mutate();
          toast(l10n.getString("linked-resources-acl-add-toast-success"), {
            type: "info",
          });
        } catch (e) {
          toast(l10n.getString("linked-resources-acl-add-toast-error-other"), {
            type: "error",
          });
        }
        setIsInitialisingAcl(false);
      };
      initialisationLinks.push(
        <button
          key={`acl-initialiser-${getSourceUrl(props.dataset.data)}`}
          className="flex w-full items-center space-x-2 rounded border-4 border-dashed border-gray-200 p-5 text-gray-500 hover:border-gray-900 hover:bg-gray-100 hover:text-gray-900 focus:border-gray-900 focus:text-gray-900 focus:outline-none"
          onClick={(e) => {
            e.preventDefault();
            initialiseAcl();
          }}
        >
          <MdAdd aria-hidden="true" className="text-3xl" />
          <ClientLocalized id="linked-resources-acl-add">
            <span>Add Access Control List</span>
          </ClientLocalized>
        </button>,
      );
    }
  }

  if (
    Object.keys(linkedResourceLabels).length === 0 &&
    initialisationLinks.length === 0
  ) {
    return null;
  }

  return (
    <>
      <ClientLocalized id="linked-resources-heading">
        <SectionHeading>Linked Resources</SectionHeading>
      </ClientLocalized>
      <div className="space-y-10 pb-10">
        {resourceLinks}
        {initialisationLinks}
      </div>
    </>
  );
};
