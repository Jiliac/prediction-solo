import { useIsContractLive, useMarketInfos, useReadMarket } from "src/hooks";
import { Market } from "src/models/market";

const formatProb = (probStr: string | undefined): string => {
  const prob = Math.round(Number(probStr) * 100);
  return prob.toString() + " %";
};

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

  const prob = formatProb(marketInfo.probability);

  return (
    <div className="rounded-lg shadow-lg py-6 my-4 bg-base-100">
      <div className="flex flex-row px-4">
        <div className="basis-5/6">
          <p className="text-xl font-bold">{marketInfo.name}</p>
          <p>Volume: {marketInfo.volume}</p>
          {isResolved && (
            <div className="badge badge-primary mx-auto mt-2">Resolved</div>
          )}
        </div>
        <div className="my-auto">
          <p className="text-3xl font-bold">{prob}</p>
        </div>
      </div>
    </div>
  );
};
