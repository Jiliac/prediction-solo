import { NextPage } from "next";
import Link from "next/link";
import { useAccount, useNetwork } from "wagmi";
import { collection, query, where } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { db } from "src/models/firebase";
import { Connect, SummaryCard } from "src/components";
import { Market } from "src/models/market";

const useDeployedMarkets = (): Market[] => {
  const { activeChain } = useNetwork();
  const marketsRef = collection(db, "markets");
  const networkQuery = query(
    marketsRef,
    where("network.id", "==", activeChain?.id)
  );
  const [values] = useCollectionData(networkQuery);

  return values as Market[];
};

const Search: NextPage = () => {
  const values = useDeployedMarkets();
  const { data: account } = useAccount();

  if (!account) return <Connect />;

  if (!values || !values.length)
    return (
      <article className="prose">
        <h1>Could not find any market</h1>
        <p className="mb-0">Maybe you are connected to unsupported network.</p>
        <p className="mt-0">
          The live deployment is on{" "}
          <a href="https://support.opensea.io/hc/en-us/articles/1500011368842-How-can-I-switch-my-wallet-to-blockchains-like-Polygon">
            Polygon
          </a>
          {"."}
        </p>
      </article>
    );

  return (
    <div className="w-screen">
      <div className="max-w-xl m-auto">
        <article className="prose mb-7">
          <h1>Existing Markets</h1>
        </article>

        <div>
          {values &&
            values.map((value) => (
              <Link href={`/${value.address}`}>
                <a>
                  <SummaryCard market={value as Market} />
                </a>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
