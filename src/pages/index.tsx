import * as React from "react";
import Head from "next/head";
import {
  asUrl,
  getStringNoLocale,
  getUrlAll,
  UrlString,
} from "@inrupt/solid-client";
import { foaf, space, vcard, solid } from "rdf-namespaces";
import Link from "next/link";
import { Layout } from "../components/Layout";
import { SessionGate } from "../components/session/SessionGate";
import { useProfile } from "../hooks/profile";
import { LoggedOut } from "../components/session/LoggedOut";
import { LoggedIn } from "../components/session/LoggedIn";
import { ClientLocalized } from "../components/ClientLocalized";
import { useL10n } from "../hooks/l10n";
import { useStorages } from "../hooks/storages";

const Home: React.FC = () => {
  const profile = useProfile();
  const storages = useStorages();
  const l10n = useL10n();

  const name = profile
    ? getStringNoLocale(profile.data, foaf.name) ??
      getStringNoLocale(profile.data, vcard.fn) ??
      asUrl(profile.data)
    : null;
  const webId = profile ? asUrl(profile.data) : "";

  return (
    <Layout>
      <Head>
        <title>Penny</title>
      </Head>
      <div className="mx-auto p-5 md:w-4/5 md:pt-20 lg:w-1/2">
        <SessionGate>
          <ClientLocalized
            id="pod-listing-heading"
            vars={{
              "owner-name": name ?? webId,
            }}
            elems={{
              "owner-link": <OwnerLink webId={webId} />,
            }}
          >
            <h3 className="block py-5 text-lg">Pod(s) of: {webId}</h3>
          </ClientLocalized>
          <ul className="space-y-5">
            {storages.map((storageUrl) => (
              <li key={storageUrl + "_storage"}>
                <Link
                  href={`/explore/?url=${encodeURIComponent(storageUrl)}`}
                  className="block rounded bg-gray-700 p-5 text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-opacity-50 focus:ring-offset-2"
                  title={l10n.getString("pod-listing-tooltip", {
                    "pod-url": storageUrl,
                  })}
                >
                  {storageUrl}
                </Link>
              </li>
            ))}
          </ul>
        </SessionGate>
        <section className="space-y-5 pt-28">
          <ClientLocalized id="intro-title">
            <h2 className="text-xl font-bold">What is this?</h2>
          </ClientLocalized>
          <ClientLocalized
            id="intro-text"
            elems={{
              "solid-link": (
                <a
                  href="https://solidproject.org/"
                  className="underline hover:bg-gray-700 hover:text-white hover:no-underline focus:bg-gray-700 focus:text-white focus:outline-none"
                />
              ),
            }}
          >
            <p>
              Penny is a tool for developers of Solid apps. It allows you to
              inspect the data on your Pod and, if you have the appropriate
              permissions, to modify and add new data. It presumes familiarity
              with the concepts of Solid.
            </p>
          </ClientLocalized>
          <LoggedOut>
            <ClientLocalized
              id="intro-get-started-logged-out"
              elems={{
                "contact-link": (
                  <a
                    href="https://gitlab.com/vincenttunru/penny/-/issues/new"
                    className="underline hover:bg-gray-700 hover:text-white hover:no-underline focus:bg-gray-700 focus:text-white focus:outline-none"
                  />
                ),
              }}
            >
              <p>
                To get started, connect to your Pod to inspect its data, or
                manually enter a URL to inspect at the top of the page. And if
                you have feedback, please get in touch!
              </p>
            </ClientLocalized>
          </LoggedOut>
          <LoggedIn>
            <ClientLocalized
              id="intro-get-started-logged-in"
              elems={{
                "contact-link": (
                  <a
                    href="https://gitlab.com/vincenttunru/penny/-/issues/new"
                    className="underline hover:bg-gray-700 hover:text-white hover:no-underline focus:bg-gray-700 focus:text-white focus:outline-none"
                  />
                ),
              }}
            >
              <p>
                To get started, follow the links above to browse your Pod, or
                manually enter a URL to inspect at the top of the page. And if
                you have feedback, please get in touch!
              </p>
            </ClientLocalized>
          </LoggedIn>
          <footer>—Vincent</footer>
        </section>
      </div>
    </Layout>
  );
};

const OwnerLink = (props: { webId: UrlString; children?: React.ReactNode }) => (
  <>
    <Link
      href={`/explore/?url=${encodeURIComponent(
        props.webId,
      )}#${encodeURIComponent(props.webId)}`}
      className="font-bold hover:text-gray-700 focus:text-gray-700 focus:underline focus:outline-none"
    >
      {props.children}
    </Link>
  </>
);

export default Home;
