import { FC } from "react";
import { useBalance } from "wagmi";

import { InfoProps } from "./contractInfo";
import { StatOnlyInfo, OneBetInfo, TwoBetInfo } from "./showStats";

const formatBet = (probStr: string | undefined): string => {
  const prob = Math.round(Number(probStr) * 10) / 10;
  return prob.toString();
};

export const SimpleInfo = ({ contractAddr, market }: InfoProps) => {
  const { data: balanceData } = useBalance({
    addressOrName: contractAddr,
    watch: true,
  });

  const isMarketYes = market?.userYesBet && Number(market?.userYesBet) > 0;
  const isMarketNo = market?.userNoBet && Number(market?.userNoBet);
  const volume = `${formatBet(balanceData?.formatted)} ${balanceData?.symbol}`;

  let Info: FC;
  if (!isMarketYes && !isMarketNo)
    Info = () => <StatOnlyInfo volume={volume} market={market} />;
  else if (isMarketYes && isMarketNo)
    Info = () => <TwoBetInfo volume={volume} market={market} />;
  else Info = () => <OneBetInfo volume={volume} market={market} />;

  return (
    <>
      <article className="prose mx-auto">
        <h1>{market?.name}</h1>
      </article>
      <Info />
    </>
  );
};
