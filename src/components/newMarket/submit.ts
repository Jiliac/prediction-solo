import { useRouter } from "next/router";
import { useEffect } from "react";
import { ethers } from "ethers";
import { SubmitHandler } from "react-hook-form";
import { Chain, useAccount, useContractWrite, useNetwork } from "wagmi";

import FactoryContract from "artifacts/contracts/MarketFactory.sol/MarketFactory.json";
import { Market, addMarket } from "src/models/market";

export interface NewMarketData {
  name: string;
  probability: string;
  liquidity: string;
}

const useOnSuccess = () => {
  const { activeChain } = useNetwork();
  const router = useRouter();
  const { data: account } = useAccount();

  return async (data: any) => {
    if (!data?.wait) return;

    const tx = await data.wait();
    if (!tx || !tx?.events) return;

    const newMarketEvents = tx.events?.filter(
      (e: any) => e?.event === "NewMarket"
    ) as any;
    if (
      !newMarketEvents ||
      !newMarketEvents?.length ||
      newMarketEvents.length === 0
    )
      return;

    const newMarketEvent = newMarketEvents[0]?.args;
    if (!newMarketEvent) return;
    const contractAddr = newMarketEvent?.contractAddr;
    const owner = newMarketEvent?.ownerAddr;
    if (!contractAddr || !owner) return;
    console.log(contractAddr, owner);

    const isOwner = account?.address === owner;
    if (!isOwner) return;

    const market: Market = {
      address: contractAddr,
      owner: owner,
      network: activeChain as Chain,
    };
    addMarket(market);

    router.push(`/${contractAddr}`);
  };
};

export const makeOnSubmit = (contractAddr: string) => {
  const onSuccess = useOnSuccess();
  const { write, isError, error } = useContractWrite(
    {
      addressOrName: contractAddr,
      contractInterface: FactoryContract.abi,
    },
    "createMarket",
    { onSuccess }
  );

  const onSubmit: SubmitHandler<NewMarketData> = (data: NewMarketData) => {
    const prob = (Number(data.probability) / 100).toString();
    const liquidityEth = ethers.utils.parseEther(data.liquidity);
    const probabilityEth = ethers.utils.parseEther(prob);

    write({
      args: [data.name, probabilityEth],
      overrides: { value: liquidityEth, gasLimit: 1e7 },
    });
  };

  useEffect(() => {
    if (isError) console.error("Create Market error:", error);
  }, [isError, error]);

  return onSubmit;
};
