import { NextPage } from "next";
import { useAccount } from "wagmi";

import { NotLive, Connect } from "../components";
import { useContractAddr, useIsFactoryLive } from "../hooks/contractAddress";

const NewMarket: NextPage = () => {
  const { data: account } = useAccount();
  const contractAddr = useContractAddr();
  const isLive = useIsFactoryLive(contractAddr);

  if (!account) return <Connect />;
  if (!isLive) return <NotLive />;

  return (
    <article className="prose">
      <h1>Make a new Market</h1>
    </article>
  );
};

export default NewMarket;
