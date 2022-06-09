import type { NextPage } from "next";
import { useAccount } from "wagmi";

import { Connect } from "../components/connect";
import { ContractInfo } from "../components/contractInfo";
import { Betting } from "../components/betting";
import { Events } from "../components/events";
import { Resolution, ResolvedStatus } from "../components/resolution";
import { Claim } from "../components/claim";

import { useIsContractLive, useContractAddr } from "../hooks/contractAddress";
import { useReadMarket } from "../hooks/contract";
import { useIsOwner } from "../hooks/isOwner";

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

export const DApp = ({ contractAddr }: { contractAddr: string }) => {
  const isOwner = useIsOwner(contractAddr);
  const resolved = useReadMarket(contractAddr, "resolved");

  return (
    <div className="container">
      <div className="columns-2 gap-14">
        <div className="break-after-column">
          <ContractInfo contractAddr={contractAddr} />
        </div>
        <div className="pt-7">
          {!resolved && <Betting contractAddr={contractAddr} />}
          {resolved && <ResolvedStatus contractAddr={contractAddr} />}
          {isOwner && <Resolution contractAddr={contractAddr} />}
        </div>
      </div>
      {resolved && (
        <>
          <div className="divider"></div>
          <Claim contractAddr={contractAddr} />
        </>
      )}
      <div className="divider"></div>
      <Events contractAddr={contractAddr} />
    </div>
  );
};

export default Index;
