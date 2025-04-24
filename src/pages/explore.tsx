import * as React from "react";
import { useRouter } from "next/router";
import { Explorer } from "../components/Explorer";
import { Loading } from "../components/Loading";

const Explore: React.FC = () => {
  const router = useRouter();
  const url = router.query.url;

  if (typeof url !== "string") {
    return <Loading />;
  }

  return (
    <Explorer
      url={url}
      onUrlChange={(url, options) =>
        router.push(
          { query: { ...router.query, url: url } },
          undefined,
          options,
        )
      }
    />
  );
};

export default Explore;
