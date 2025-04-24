import {
  createThing,
  getSourceUrl,
  getStringNoLocale,
  getStringNoLocaleAll,
  getThing,
  getUrlAll,
  overwriteFile,
  UrlString,
} from "@inrupt/solid-client";
import { fetch } from "@inrupt/solid-client-authn-browser";
import { FormEventHandler, useState } from "react";
import { MdCheck, MdLabelOutline } from "react-icons/md";
import { VscLink } from "react-icons/vsc";
import { toast } from "react-toastify";
import { LoadedCachedDataset } from "../../hooks/dataset";
import { useL10n } from "../../hooks/l10n";
import { ClientLocalized } from "../ClientLocalized";

export type Props = {
  dataset: LoadedCachedDataset;
};

export const solid_oidc = {
  client_name: "http://www.w3.org/ns/solid/oidc#client_name",
  redirect_uris: "http://www.w3.org/ns/solid/oidc#redirect_uris",
  client_uri: "http://www.w3.org/ns/solid/oidc#client_uri",
  scope: "http://www.w3.org/ns/solid/oidc#scope",
};

export const ClientIdViewer: React.FC<Props> = (props) => {
  const l10n = useL10n();
  const url = getSourceUrl(props.dataset.data);
  const clientIdThing =
    getThing(props.dataset.data, url) ?? createThing({ url: url });
  const [clientNameInput, setClientNameInput] = useState(
    getStringNoLocale(clientIdThing, solid_oidc.client_name) ?? "",
  );
  // TODO: Add warning if redirect URLs mix localhost and remote origins:
  const [redirectUrls, setRedirectUrls] = useState<UrlString[]>(
    getUrlAll(clientIdThing, solid_oidc.redirect_uris) ?? [],
  );

  const redirectUrlEditors = redirectUrls.map((redirectUrl, index) => {
    return (
      <RedirectUrlEditor
        key={`redirectUrlEditor${index}`}
        redirectUrl={redirectUrl}
        onChange={(newRedirectUrl) =>
          setRedirectUrls((oldUrls) => {
            if (newRedirectUrl === "") {
              return oldUrls.slice(0, index).concat(oldUrls.slice(index + 1));
            }
            const newUrls = [...oldUrls];
            newUrls[index] = newRedirectUrl;
            return newUrls;
          })
        }
        required={index === 0}
      />
    );
  });
  redirectUrlEditors.push(
    <RedirectUrlEditor
      key={`newRedirectUrlEditor`}
      redirectUrl=""
      onChange={(newRedirectUrl) =>
        setRedirectUrls(redirectUrls.concat([newRedirectUrl]))
      }
      required={redirectUrls.length === 0}
    />,
  );

  const onSubmit: FormEventHandler = async (event) => {
    event.preventDefault();

    const clientId = {
      "@context": "https://www.w3.org/ns/solid/oidc-context.jsonld",
      client_id: url,
      redirect_uris: redirectUrls,
      client_name: clientNameInput.length > 0 ? clientNameInput : undefined,
      token_endpoint_auth_method: "none",
      grant_types: ["refresh_token", "authorization_code"],
      response_types: ["code"],
      scope: "openid webid offline_access",
    };

    await overwriteFile(url, new Blob([JSON.stringify(clientId)]), {
      fetch: fetch,
      contentType: "application/ld+json",
    });

    props.dataset.mutate();

    toast(l10n.getString("clientid-update-toast-success"), { type: "info" });
  };

  return (
    <>
      <form onSubmit={onSubmit} className="relative rounded-xl bg-gray-50 pb-5">
        <h3 className="flex items-center break-words rounded-t-xl bg-gray-700 p-5 text-lg font-bold text-white md:text-xl lg:text-2xl">
          {l10n.getString("clientid-editor-heading")}
        </h3>
        <div className="flex flex-col items-start space-y-5 px-5 pt-5">
          <div className="flex flex-col space-y-3">
            <label htmlFor="clientName" className="font-bold">
              {l10n.getString("clientid-editor-clientname-label")}
            </label>
            <div className="flex items-center space-x-2 p-2 pb-5">
              <span aria-hidden className="w-10 p-2 text-gray-500">
                <MdLabelOutline />
              </span>
              <ClientLocalized
                id="clientid-editor-clientname-input"
                attrs={{ placeholder: true }}
              >
                <input
                  id="clientName"
                  type="text"
                  value={clientNameInput}
                  onChange={(e) => setClientNameInput(e.target.value)}
                  className="w-80 flex-grow rounded p-2 focus:outline-none focus:ring-2 focus:ring-gray-700"
                />
              </ClientLocalized>
            </div>
          </div>
          <fieldset>
            <legend className="py-3 font-bold">
              {l10n.getString("clientid-editor-redirect-urls-heading")}
            </legend>
            {redirectUrlEditors}
          </fieldset>
          <button
            type="submit"
            className="flex items-center space-x-2 rounded border-2 border-gray-700 px-5 py-3 text-lg text-gray-700 hover:bg-gray-700 hover:text-white focus:bg-gray-700 focus:text-white focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-opacity-50 focus:ring-offset-2"
          >
            <MdCheck aria-hidden />
            <span>{l10n.getString("resource-add-name-submit")}</span>
          </button>
        </div>
      </form>
    </>
  );
};

type RedirectUrlEditorProps = {
  onChange: (url: UrlString) => void;
  redirectUrl: UrlString;
  required?: boolean;
};
const RedirectUrlEditor: React.FC<RedirectUrlEditorProps> = (props) => {
  const l10n = useL10n();

  return (
    <div className="flex items-center space-x-2 p-2 pb-5">
      <label className="w-10 p-2 text-gray-500" htmlFor="newUrl">
        <VscLink
          aria-label={l10n.getString("clientid-editor-redirect-url-label")}
        />
      </label>
      <ClientLocalized
        id="clientid-editor-redirect-url-input"
        attrs={{ placeholder: true, title: true }}
      >
        <input
          type="url"
          className="w-80 flex-grow rounded p-2 focus:outline-none focus:ring-2 focus:ring-gray-700"
          placeholder="https://…"
          name="newUrl"
          id="newUrl"
          value={props.redirectUrl}
          onChange={(e) => {
            e.preventDefault();
            props.onChange(e.target.value);
          }}
          autoFocus={true}
          required={props.required}
        />
      </ClientLocalized>
    </div>
  );
};
