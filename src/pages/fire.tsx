import { addDoc, collection } from "firebase/firestore";
import { NextPage } from "next";
import { db } from "src/libs/firebase";

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

const Fire: NextPage = () => {
  return (
    <div className="w-screen">
      <div className="max-w-xl m-auto">
        <article className="prose">
          <h1>Fire Trial</h1>

          <button className="btn btn-accent" onClick={addData}>
            Add Data
          </button>
        </article>
      </div>
    </div>
  );
};

export default Fire;
