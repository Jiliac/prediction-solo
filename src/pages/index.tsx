import { NextPage } from "next";
import Link from "next/link";
import { useAccount } from "wagmi";
import { collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { db } from "src/models/firebase";
import { Connect, SummaryCard } from "src/components";
import { Market } from "src/models/market";

const Search: NextPage = () => {
  const [values] = useCollectionData(collection(db, "markets"));
  const { data: account } = useAccount();

  if (!account) return <Connect />;

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
