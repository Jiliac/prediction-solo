import type { NextPage } from "next";
import { chain } from "wagmi";

const Other: NextPage = () => {
  return (
    <article className="prose">
      <h1>Something</h1>
      <p>{JSON.stringify(chain.polygon)}</p>
      <p>{JSON.stringify(chain.polygonMumbai)}</p>
      <p>{JSON.stringify(chain.localhost)}</p>
      <p>{JSON.stringify(chain.hardhat)}</p>
    </article>
  );
};

export default Other;
