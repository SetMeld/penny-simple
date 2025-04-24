import * as React from "react";
import Head from "next/head";
import { UrlString } from "@inrupt/solid-client";
import { Layout } from "./Layout";
import { Spinner } from "./ui/Spinner";

interface Props {
  url?: UrlString;
}

export const Loading: React.FC<Props> = (props) => {
  return (
    <Layout path={props.url}>
      <Head>
        <title>Penny</title>
      </Head>
      <div className="mx-auto p-5 md:w-4/5 md:pt-20 lg:w-2/3 xl:w-1/2">
        <Spinner />
      </div>
    </Layout>
  );
};
