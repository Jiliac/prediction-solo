import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useAccount } from "wagmi";

import { useMarketInfos } from "../../hooks";
import { Market } from "./market";
import { SimpleInfo } from "./simpleInfo";
import { TableInfo } from "./tableInfo";

export interface InfoProps {
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
