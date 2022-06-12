import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useAccount, useBalance } from "wagmi";

import { useMarketInfos } from "../hooks";

interface Market {
  name: string;
  probability: string;

  userYesBet: string;
  userNoBet: string;

  yesTokenTotSupply: string;
  noTokenTotSupply: string;
}

interface InfoProps {
  contractAddr: string;
  market: Market | undefined;
}

export const ContractInfo = ({
  contractAddr,
  old,
}: {
  contractAddr: string;
  old?: boolean;
}) => {
  const [market, setMarket] = useState<Market | undefined>(undefined);
  const { data: account } = useAccount();

  const { name, impliedProb, totalSupply, userBalance } =
    useMarketInfos(contractAddr);

  useEffect(() => {
    if (!name || !impliedProb || !totalSupply || !account) {
      setMarket(undefined);
      return;
    }

    try {
      const [yesTot, noTot] = totalSupply;

      const [userYes, userNo] = userBalance;

      const market: Market = {
        name: name,
        probability: ethers.utils.formatEther(impliedProb),
        userYesBet: ethers.utils.formatEther(userYes),
        userNoBet: ethers.utils.formatEther(userNo),
        yesTokenTotSupply: ethers.utils.formatEther(yesTot),
        noTokenTotSupply: ethers.utils.formatEther(noTot),
      };

      setMarket(market);
    } catch (e) {
      setMarket(undefined);
      console.log("Error setting market:", e);
    }
  }, [name, impliedProb, account, totalSupply, userBalance]);

  if (!market) <h2>Contract but no market?</h2>;

  if (old) return <TableInfo contractAddr={contractAddr} market={market} />;
  return <SimpleInfo contractAddr={contractAddr} market={market} />;
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
  const valueColor = color ? `text-${color}-500` : "";

  return (
    <div className="stats shadow my-1">
      <div className="stat">
        <div className="stat-title">{title}</div>
        <div className={`stat-value ${valueColor}`}>{value}</div>
      </div>
    </div>
  );
};

const SimpleInfo = ({ contractAddr, market }: InfoProps) => {
  const { data: balanceData } = useBalance({
    addressOrName: contractAddr,
    watch: true,
  });

  const formatProb = (probStr: string | undefined): string => {
    const prob = Math.round(Number(probStr) * 100);
    return prob.toString() + " %";
  };
  const formatBet = (probStr: string | undefined): string => {
    const prob = Math.round(Number(probStr) * 10) / 10;
    return prob.toString();
  };
  const getColumnN = (market: Market | undefined): string => {
    let columnN = 2;
    if (Number(market?.userNoBet) > 0) columnN += 1;
    if (Number(market?.userYesBet) > 0) columnN += 1;
    return columnN.toString();
  };

  return (
    <>
      <article className="prose mx-auto">
        <h1>{market?.name}</h1>
      </article>
      <div className={`columns-${getColumnN(market)} gap-1 my-10`}>
        <div>
          <Stat
            title="Volume on this market"
            value={`${formatBet(balanceData?.formatted)} ${
              balanceData?.symbol
            }`}
          />
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
    </>
  );
};

const TableInfo = ({ contractAddr, market }: InfoProps) => {
  const { data: balanceData } = useBalance({
    addressOrName: contractAddr,
    watch: true,
  });

  return (
    <article className="prose">
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Property</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Contract Address</td>
              <td>{contractAddr}</td>
            </tr>
            <tr>
              <td>Implied Probability</td>
              <td>{market?.probability}</td>
            </tr>
            <tr>
              <td>Name</td>
              <td>{market?.name}</td>
            </tr>
            {balanceData && (
              <tr>
                <td>Contract Balance</td>
                <td>
                  {balanceData?.formatted} {balanceData?.symbol}
                </td>
              </tr>
            )}
            <tr>
              <td>Your Yes Bet</td>
              <td>{market?.userYesBet}</td>
            </tr>
            <tr>
              <td>Your No Bet</td>
              <td>{market?.userNoBet}</td>
            </tr>
            <tr>
              <td>Yes Token Total Supply</td>
              <td>{market?.yesTokenTotSupply}</td>
            </tr>
            <tr>
              <td>No Token Total Supply</td>
              <td>{market?.noTokenTotSupply}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </article>
  );
};
