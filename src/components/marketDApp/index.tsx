import { useReadMarket, useIsOwner } from "src/hooks";
import { ContractInfo } from "src/components/contractInfo";

import { Betting } from "./betting";
import { Events } from "./events";
import { Resolution, ResolvedStatus } from "./resolution";
import { Claim } from "./claim";

export const DAppV2 = ({ contractAddr }: { contractAddr: string }) => {
  const isOwner = useIsOwner(contractAddr);
  const resolved = useReadMarket(contractAddr, "resolved");

  return (
    <div className="container">
      <ContractInfo contractAddr={contractAddr} />
      <div className="divider"></div>
      <div className="max-w-sm mx-auto">
        {!resolved && <Betting contractAddr={contractAddr} />}
        {resolved && <ResolvedStatus contractAddr={contractAddr} />}
        {isOwner && <Resolution contractAddr={contractAddr} />}
        {resolved && <Claim contractAddr={contractAddr} />}
      </div>
    </div>
  );
};

export const DAppV1 = ({ contractAddr }: { contractAddr: string }) => {
  const isOwner = useIsOwner(contractAddr);
  const resolved = useReadMarket(contractAddr, "resolved");

  return (
    <div className="container">
      <div className="columns-2 gap-14">
        <div className="break-after-column">
          <ContractInfo contractAddr={contractAddr} old />
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

export const DApp = DAppV2;
