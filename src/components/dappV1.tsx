import { ContractInfo } from "./contractInfo";
import { Betting } from "./betting";
import { Events } from "./events";
import { Resolution, ResolvedStatus } from "./resolution";
import { Claim } from "./claim";

import { useReadMarket, useIsOwner } from "../hooks";

export const DAppV1 = ({ contractAddr }: { contractAddr: string }) => {
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
