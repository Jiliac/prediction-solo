import { FC } from "react";
import { Market } from "./market";

const formatBet = (probStr: string | undefined): string => {
  const prob = Math.round(Number(probStr) * 10) / 10;
  return prob.toString();
};

const formatProb = (probStr: string | undefined): string => {
  const prob = Math.round(Number(probStr) * 100);
  return prob.toString() + " %";
};

export const StatOnlyInfo = ({
  volume,
  market,
}: {
  volume: string;
  market: Market | undefined;
}) => {
  return (
    <div className="columns-2 gap-1 my-10">
      <div>
        <Stat title="Volume on this market" value={volume} />
      </div>

      {market?.userYesBet && Number(market?.userYesBet) > 0 && (
        <div>
          <Stat
            title="Your YES bet"
            value={formatBet(market?.userYesBet)}
            color="green"
          />
        </div>
      )}

      {market?.userNoBet && Number(market?.userNoBet) > 0 && (
        <div>
          <Stat
            title="Your NO bet"
            value={formatBet(market?.userNoBet)}
            color="red"
          />
        </div>
      )}

      <div>
        <Stat title="Chance" value={formatProb(market?.probability)} />
      </div>
    </div>
  );
};

export const OneBetInfo = ({
  volume,
  market,
}: {
  volume: string;
  market: Market | undefined;
}) => {
  return (
    <div className="columns-3 gap-1 my-10">
      <div>
        <Stat title="Volume on this market" value={volume} />
      </div>

      {market?.userYesBet && Number(market?.userYesBet) > 0 && (
        <div>
          <Stat
            title="Your YES bet"
            value={formatBet(market?.userYesBet)}
            color="green"
          />
        </div>
      )}

      {market?.userNoBet && Number(market?.userNoBet) > 0 && (
        <div>
          <Stat
            title="Your NO bet"
            value={formatBet(market?.userNoBet)}
            color="red"
          />
        </div>
      )}

      <div>
        <Stat title="Chance" value={formatProb(market?.probability)} />
      </div>
    </div>
  );
};

export const TwoBetInfo = ({
  volume,
  market,
}: {
  volume: string;
  market: Market | undefined;
}) => {
  return (
    <div className="columns-4 gap-1 my-10">
      <div>
        <Stat title="Volume on this market" value={volume} />
      </div>

      <div>
        <Stat
          title="Your YES bet"
          value={formatBet(market?.userYesBet)}
          color="green"
        />
      </div>

      <div>
        <Stat
          title="Your NO bet"
          value={formatBet(market?.userNoBet)}
          color="red"
        />
      </div>

      <div>
        <Stat title="Chance" value={formatProb(market?.probability)} />
      </div>
    </div>
  );
};

const Stat = ({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color?: string;
}) => {
  let ShowValue: FC;

  switch (color) {
    case "green":
      ShowValue = () => (
        <div className="stat-value text-green-500">{value}</div>
      );
      break;

    case "red":
      ShowValue = () => <div className="stat-value text-red-500">{value}</div>;
      break;

    default:
      ShowValue = () => <div className="stat-value">{value}</div>;
  }

  return (
    <div className="stats shadow my-1">
      <div className="stat">
        <div className="stat-title">{title}</div>
        <ShowValue />
      </div>
    </div>
  );
};
