import type { NextPage } from "next";
import { useAccount } from "wagmi";

import { Connect } from "../components/connect";
import { ContractInfo } from "../components/contractInfo";
import { Betting } from "../components/betting";
import { Events } from "../components/events";
import { Resolution, ResolvedStatus } from "../components/resolution";
import { Claim } from "../components/claim";
import { useMarketContract, useReadMarket } from "../hooks/contract";
import { useIsOwner } from "../hooks/isOwner";

const Index: NextPage = () => {
  const { data: account } = useAccount();
  const contract = useMarketContract();
  const isOwner = useIsOwner();
  const resolved = useReadMarket("resolved");

  if (!account) return <Connect />;
  if (!contract) return <h2>No contract. Issue.</h2>;

  return (
    <div className="container">
      <div className="columns-2 gap-14">
        <div className="break-after-column">
          <ContractInfo />
        </div>
        <div className="pt-7">
          {!resolved && <Betting contract={contract} />}
          {resolved && <ResolvedStatus />}
          {isOwner && <Resolution />}
        </div>
      </div>
      {resolved && (
        <>
          <div className="divider"></div>
          <Claim />
        </>
      )}
      <div className="divider"></div>
      <Events />
    </div>
  );
};

export default Index;
