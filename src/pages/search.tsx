import { NextPage } from "next";
import { collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { db } from "src/models/firebase";
import Link from "next/link";

const Search: NextPage = () => {
  const [values] = useCollectionData(collection(db, "markets"));

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
                  <div className="rounded-lg shadow-lg py-6 my-4 bg-base-100">
                    <p>Address: {value.address}</p>
                    <p>Owner: {value.owner}</p>
                    <p>Network: {value.network?.name}</p>
                  </div>
                </a>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
