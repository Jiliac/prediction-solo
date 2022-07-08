import { useIsContractLive, useMarketInfos, useReadMarket } from "src/hooks";
import { Market } from "src/models/market";

export const SummaryCard = ({ market }: { market: Market }) => {
  const isLive = useIsContractLive(market.address);
  const marketInfo: any = useMarketInfos(market.address);
  const isResolved = useReadMarket(market.address, "resolved");

  if (!isLive)
    return (
      <div className="rounded-lg shadow-lg py-6 my-4 bg-base-100">
        <p>Cannot find this contract. Did it went offline?</p>
      </div>
    );

  if (!market)
    return (
      <div className="rounded-lg shadow-lg py-6 my-4 bg-base-100">
        <p>Error loading information on this contract</p>
      </div>
    );

  return (
    <div className="rounded-lg shadow-lg py-6 my-4 bg-base-100">
      <p>Name: {marketInfo.name}</p>
      <p>Probability: {marketInfo.probability}</p>
      <p>Volume: {marketInfo.yesTokenTotSupply}</p>
      <p>
        Is Resolved? {"=>"} {isResolved?.toString()}
      </p>
    </div>
  );
};
