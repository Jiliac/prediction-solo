import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useAccount, useBalance } from "wagmi";

import { useMarketInfos } from "../hooks/contract";

const contractAddr = String(process.env.NEXT_PUBLIC_LOCAL_CONTRACT);

interface Market {
  name: string;
  probability: string;

  userYesBet: string;
  userNoBet: string;

  yesTokenTotSupply: string;
  noTokenTotSupply: string;
}

export const ContractInfo = ({ contract }: any) => {
  const [market, setMarket] = useState<Market | undefined>(undefined);
  const { data: account } = useAccount();
  const { data: balanceData } = useBalance({
    addressOrName: contractAddr,
    watch: true,
  });

  const { name, impliedProb, totalSupply, userBalance } = useMarketInfos();
  useEffect(() => {
    if (!contract) return;

    const f = async () => {
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
    };

    f();
  }, [contract, name, impliedProb, account, totalSupply, userBalance]);

  if (!market) <h2>Contract but no market?</h2>;

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
