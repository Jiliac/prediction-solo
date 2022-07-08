import { FC } from "react";

import { InfoProps } from "./contractInfo";
import { StatOnlyInfo, OneBetInfo, TwoBetInfo } from "./showStats";

export const SimpleInfo = ({ contractAddr, market }: InfoProps) => {
  const isMarketYes = market?.userYesBet && Number(market?.userYesBet) > 0;
  const isMarketNo = market?.userNoBet && Number(market?.userNoBet);
  const volume = market?.volume ? market?.volume : "";

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
