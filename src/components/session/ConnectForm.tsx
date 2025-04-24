import { useId } from "react-aria";
import React, {
  FC,
  FormEventHandler,
  MouseEventHandler,
  useState,
} from "react";
import { toast } from "react-toastify";
import { connect } from "../../functions/connect";
import { fetchIdps } from "../../functions/fetchIdp";
import * as storage from "../../functions/localStorage";
import { useSessionInfo } from "../../hooks/sessionInfo";
import { ClientLocalized } from "../ClientLocalized";
import { SubmitButton, TextField } from "../ui/forms";
import { Spinner } from "../ui/Spinner";
import { useIntegratedIssuer } from "../../hooks/integratedIssuer";
import { useL10n } from "../../hooks/l10n";

export const ConnectForm: FC = (props) => {
  const l10n = useL10n();
  const suggestedSolidServer =
    typeof document !== "undefined"
      ? new URLSearchParams(document.location.search).get("solid_server")
      : null;
  const [issuerInput, setIssuerInput] = useState(
    suggestedSolidServer ??
      storage.getItem("last-successful-idp") ??
      "https://solidcommunity.net",
  );
  const [autoconnectInput, setAutoconnectInput] = useState(
    storage.getItem("autoconnect") === "true",
  );
  const autoconnectInputId = useId();
  const [loading, setLoading] = useState(false);
  const sessionInfo = useSessionInfo();
  const integratedIssuer = useIntegratedIssuer();

  if (loading || typeof sessionInfo === "undefined") {
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  }

  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    setLoading(true);

    const issuerWithProtocol =
      issuerInput.startsWith("https://") || issuerInput.startsWith("http://")
        ? issuerInput
        : `https://${issuerInput}`;
    const issuer = issuerWithProtocol.endsWith("/")
      ? issuerWithProtocol.substring(0, issuerWithProtocol.length - 1)
      : issuerWithProtocol;

    try {
      if (issuer === "https://broker.pod.inrupt.com") {
        throw new Error(
          "Immediately caught; broker.pod.inrupt.com will appear to work, but return an invalid WebID. Thus, let's pre-emptively get us to the error path.",
        );
      }
      storage.setItem("last-attempted-idp", issuer);
      storage.setItem(
        "autoconnect",
        autoconnectInput === true ? "true" : "false",
      );
      await connect(issuer);
    } catch (e) {
      let toastMesagge = (
        <ClientLocalized
          id="connecterror-no-pod"
          vars={{ "pod-url": issuer }}
          elems={{ "pod-url": <samp className="font-mono" /> }}
        >
          <span>
            Could not find a Solid Pod at{" "}
            <samp className="font-mono">{issuer}</samp>. Please check the name
            and try again.
          </span>
        </ClientLocalized>
      );
      const detectedIdps = await fetchIdps(issuer);
      if (detectedIdps.length > 0) {
        // If the user has one or more Solid Identity Providers listed in their profile doc,
        // pick a random one to suggest (if the user has multiple Identity Providers,
        // they'll probably know to enter its URL rather than their WebID):
        const detectedIdp = detectedIdps[0];
        const connectToDetectedIdp: MouseEventHandler = (event) => {
          event.preventDefault();
          setIssuerInput(detectedIdp);
          storage.setItem("last-attempted-idp", detectedIdp);
          storage.setItem(
            "autoconnect",
            autoconnectInput === true ? "true" : "false",
          );
          connect(detectedIdp);
        };
        toastMesagge = (
          <ClientLocalized
            id="connecterror-webid"
            vars={{ "pod-url": issuerInput, "detected-pod-url": detectedIdp }}
            elems={{
              "pod-url": <samp className="font-mono" />,
              "idp-button": (
                <button
                  className="text-left underline hover:text-gray-300"
                  onClick={connectToDetectedIdp}
                />
              ),
            }}
          >
            <span>
              It looks like your Pod is located at{" "}
              <samp className="font-mono">{detectedIdp}</samp> Use that to
              connect your Pod?
            </span>
          </ClientLocalized>
        );
      }
      if (
        ["https://use.id", "https://pods.use.id", "https://op.use.id"].includes(
          issuer,
        )
      ) {
        const suggestedServer = "https://idp.use.id";
        const connectToUseId: MouseEventHandler = (event) => {
          event.preventDefault();
          setIssuerInput(suggestedServer);
          storage.setItem("last-attempted-idp", suggestedServer);
          storage.setItem(
            "autoconnect",
            autoconnectInput === true ? "true" : "false",
          );
          connect(suggestedServer);
        };
        toastMesagge = (
          <ClientLocalized
            id="connecterror-not-useid"
            vars={{ "pod-url": issuer, "suggested-pod-url": suggestedServer }}
            elems={{
              "pod-url": <samp className="font-mono" />,
              "useid-button": (
                <button
                  className="text-left underline hover:text-gray-300"
                  onClick={connectToUseId}
                />
              ),
            }}
          >
            <span>
              Could not find a Solid Pod to connect to. Did you mean{" "}
              {suggestedServer}?
            </span>
          </ClientLocalized>
        );
      }
      if (
        [
          "https://pod.inrupt.com",
          "https://inrupt.com",
          "https://id.inrupt.com",
          "https://storage.inrupt.com",
        ].includes(issuer)
      ) {
        const suggestedServer = "https://login.inrupt.com";
        const connectToInrupt: MouseEventHandler = (event) => {
          event.preventDefault();
          setIssuerInput(suggestedServer);
          storage.setItem("last-attempted-idp", suggestedServer);
          storage.setItem(
            "autoconnect",
            autoconnectInput === true ? "true" : "false",
          );
          connect(suggestedServer);
        };
        toastMesagge = (
          <ClientLocalized
            id="connecterror-not-inrupt"
            vars={{ "pod-url": issuer, "suggested-pod-url": suggestedServer }}
            elems={{
              "pod-url": <samp className="font-mono" />,
              "inrupt-button": (
                <button
                  className="text-left underline hover:text-gray-300"
                  onClick={connectToInrupt}
                />
              ),
            }}
          >
            <span>
              Could not find a Solid Pod to connect to. Did you mean{" "}
              {suggestedServer}?
            </span>
          </ClientLocalized>
        );
      }
      if (issuer === "https://broker.pod.inrupt.com") {
        const suggestedServer = "https://login.inrupt.com";
        const connectToInrupt: MouseEventHandler = (event) => {
          event.preventDefault();
          setIssuerInput(suggestedServer);
          storage.setItem("last-attempted-idp", suggestedServer);
          storage.setItem(
            "autoconnect",
            autoconnectInput === true ? "true" : "false",
          );
          connect(suggestedServer);
        };
        toastMesagge = (
          <ClientLocalized
            id="connecterror-deprecated-inrupt"
            vars={{ "pod-url": issuer, "suggested-pod-url": suggestedServer }}
            elems={{
              "pod-url": <samp className="font-mono" />,
              "inrupt-button": (
                <button
                  className="text-left underline hover:text-gray-300"
                  onClick={connectToInrupt}
                />
              ),
            }}
          >
            <span>
              Inrupt has deprecated broker.pod.inrupt.com. Would you like to
              connect to {suggestedServer} instead?
            </span>
          </ClientLocalized>
        );
      }
      if (issuer === "https://solid.community") {
        const suggestedServer = "https://solidcommunity.net";
        const connectToSolidCommunity: MouseEventHandler = (event) => {
          event.preventDefault();
          setIssuerInput(suggestedServer);
          storage.setItem("last-attempted-idp", suggestedServer);
          storage.setItem(
            "autoconnect",
            autoconnectInput === true ? "true" : "false",
          );
          connect(suggestedServer);
        };
        toastMesagge = (
          <ClientLocalized
            id="connecterror-not-solidcommunity"
            vars={{
              "pod-url": issuerInput,
              "suggested-pod-url": suggestedServer,
            }}
            elems={{
              "pod-url": <samp className="font-mono" />,
              "solidcommunity-button": (
                <button
                  className="text-left underline hover:text-gray-300"
                  onClick={connectToSolidCommunity}
                />
              ),
            }}
          >
            <span>
              Could not find a Solid Pod to connect to. Did you mean{" "}
              {suggestedServer}?
            </span>
          </ClientLocalized>
        );
      }
      toast(toastMesagge, { type: "warning" });
      setLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="flex flex-col space-y-5 text-xl lg:text-2xl"
      >
        <ClientLocalized id="connectform-label">
          <label htmlFor="idp" className="p-x-3 text-lg font-bold lg:text-2xl">
            Connect your Pod at:
          </label>
        </ClientLocalized>
        <TextField
          id="idp"
          type="text"
          inputMode="url"
          value={issuerInput}
          list="idps"
          onChange={setIssuerInput}
          className="p-3"
          autoFocus={true}
        />
        <datalist id="idps">
          <option value="https://login.inrupt.com" />
          <option value="https://solidcommunity.net" />
          <option value="https://solidweb.org" />
          <option value="https://solidweb.me" />
          <option value="https://teamid.live" />
          <option value="https://solid.redpencil.io" />
          <option value="https://pods.solidcommunity.au" />
          <option value="https://idp.use.id" />
          <option value="https://datapod.igrant.io" />
          {typeof integratedIssuer === "string" && (
            <option value={integratedIssuer} />
          )}
        </datalist>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="autoconnect"
            id={autoconnectInputId}
            onChange={(event) => setAutoconnectInput(event.target.checked)}
          />
          <label htmlFor={autoconnectInputId}>
            {l10n.getString("connectform-autoconnect-label")}
          </label>
        </div>
        <ClientLocalized id="connectform-button" attrs={{ value: true }}>
          <SubmitButton value="Connect" className="p-3" />
        </ClientLocalized>
      </form>
    </>
  );
};
