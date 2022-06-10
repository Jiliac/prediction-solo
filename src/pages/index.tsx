import type { NextPage } from "next";
import { useAccount } from "wagmi";

import { Connect, DApp } from "../components";
import { useIsContractLive, useContractAddr } from "../hooks/contractAddress";

const Index: NextPage = () => {
  const { data: account } = useAccount();
  const contractAddr = useContractAddr();
  const isLive = useIsContractLive(contractAddr);

  if (!account) return <Connect />;

  if (!isLive)
    return (
      <div className="container">
        <article className="prose">
          <h2>Contract is not live</h2>
        </article>
      </div>
    );

  return <DApp contractAddr={contractAddr} />;
};

export default Index;
