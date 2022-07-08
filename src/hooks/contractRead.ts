import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useAccount, useBalance, useContractRead } from "wagmi";

import { Market } from "src/components/contractInfo/market";
import MarketContract from "artifacts/contracts/Market.sol/Market.json";

const formatBet = (probStr: string | undefined): string => {
  const prob = Math.round(Number(probStr) * 10) / 10;
  return prob.toString();
};

export const useMarketInfos = (contractAddr: string): Market | undefined => {
  const [market, setMarket] = useState<Market | undefined>(undefined);
  const { data: account } = useAccount();
  const { data: balanceData } = useBalance({
    addressOrName: contractAddr,
    watch: true,
  });

  const name = useReadMarket(contractAddr, "name");
  const impliedProb = useReadMarket(contractAddr, "impliedProbability");
  const totalSupply = useReadMarket(contractAddr, "totalSupply");
  const userBalance = useReadMarket(contractAddr, "tokenBalanceOf", [
    account?.address,
  ]);
  const volume = `${formatBet(balanceData?.formatted)} ${balanceData?.symbol}`;

  useEffect(() => {
    if (!name || !impliedProb || !totalSupply) {
      setMarket(undefined);
      return;
    }

    const [yesTot, noTot] = totalSupply;
    const [userYes, userNo] = userBalance;

    const market: Market = {
      name: name,
      probability: ethers.utils.formatEther(impliedProb),
      userYesBet: ethers.utils.formatEther(userYes),
      userNoBet: ethers.utils.formatEther(userNo),
      yesTokenTotSupply: ethers.utils.formatEther(yesTot),
      noTokenTotSupply: ethers.utils.formatEther(noTot),
      volume: volume,
    };

    setMarket(market);
  }, [name, impliedProb, totalSupply, userBalance]);

  return market;
};

export const useReadMarket = (
  contractAddr: string,
  func: string,
  args?: Array<any>
): any => {
  const { data: account } = useAccount();

  const { data } = useContractRead(
    { addressOrName: contractAddr, contractInterface: MarketContract.abi },
    func,
    {
      overrides: { from: account?.address },
      watch: true,
      args: args,
    }
  );
  return data;
};
