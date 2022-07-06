import { addDoc, collection } from "firebase/firestore";
import { NextPage } from "next";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { db } from "src/models/firebase";
import { addMarket, Market } from "src/models/market";

const addData = async () => {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      first: "Ada",
      last: "Lovelace",
      born: 1815,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const createMockMarket = () => {
  const mockMarket: Market = {
    address: "foo1",
    owner: "toto",
    network: null as any,
  };
  addMarket(mockMarket);
};

const Fire: NextPage = () => {
  const [values] = useCollectionData(collection(db, "users"));

  return (
    <div className="w-screen">
      <div className="max-w-xl m-auto">
        <article className="prose">
          <h1>Fire Trial</h1>

          <div className="mb-5">
            <button className="btn btn-accent" onClick={addData}>
              Add Data
            </button>
          </div>

          <button className="btn btn-accent" onClick={createMockMarket}>
            Create Mock Market
          </button>

          {values && values.map((value) => <p>{JSON.stringify(value)}</p>)}
        </article>
      </div>
    </div>
  );
};

export default Fire;
