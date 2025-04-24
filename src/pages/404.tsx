import * as React from "react";
import { useRouter } from "next/router";
import { Layout } from "../components/Layout";

const NotFound: React.FC = () => {
  const router = useRouter();

  const currentUrl =
    typeof window !== "undefined"
      ? new URL(window.location.origin + router.asPath)
      : undefined;
  const oldExploreRoute = currentUrl?.pathname.match(/\/explore\/(.+)/);
  if (Array.isArray(oldExploreRoute) && oldExploreRoute.length === 2) {
    router.replace(`/explore/?url=${oldExploreRoute[1]}`);
  }

  return (
    <Layout>
      <div className="mx-auto p-5 md:w-4/5 md:pt-20 lg:w-2/3 xl:w-1/2">
        This page could not be found.
      </div>
    </Layout>
  );
};

export default NotFound;
