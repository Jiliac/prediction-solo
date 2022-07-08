import { addDoc, collection } from "firebase/firestore";
import { Chain } from "wagmi";
import { db } from "src/models/firebase";

export interface Market {
  address: string;
  owner: string;
  network: Chain;
}

export const addMarket = async (market: Market) => {
  try {
    const docRef = await addDoc(collection(db, "markets"), market);
    console.log("New market created with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
