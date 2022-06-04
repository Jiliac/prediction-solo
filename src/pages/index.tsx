import type { NextPage } from "next";
import { useAccount } from "wagmi";

import { useMarketContract } from "../hooks/contract";
import { Connect } from "../components/connect";
import { ContractInfo } from "../components/contractInfo";
import { ConnectedInfo } from "../components/connectedInfo";
import { Betting } from "../components/betting";
import { Events } from "../components/events";

const Index: NextPage = () => {
  const { data: account } = useAccount();
  const contract = useMarketContract();

  if (!account) return <Connect />;

  return (
    <>
      <ConnectedInfo />

      {contract && (
        <div className="container">
          <div className="columns-2 gap-14">
            <div className="break-after-column">
              <ContractInfo contract={contract} />
            </div>
            <div className="pt-7">
              <Betting contract={contract} />{" "}
            </div>
          </div>
          <div className="divider"></div>
          <Events />
        </div>
      )}
    </>
  );
};

export default Index;
