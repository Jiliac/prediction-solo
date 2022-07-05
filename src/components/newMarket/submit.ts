import { useEffect } from "react";
import { ethers } from "ethers";
import { SubmitHandler } from "react-hook-form";
import { useContractWrite } from "wagmi";

import FactoryContract from "artifacts/contracts/MarketFactory.sol/MarketFactory.json";

export interface NewMarketData {
  name: string;
  probability: string;
  liquidity: string;
}

export const makeOnSubmit = (contractAddr: string) => {
  const { write, isError, error } = useContractWrite(
    {
      addressOrName: contractAddr,
      contractInterface: FactoryContract.abi,
    },
    "createMarket"
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
    if (isError) {
      console.error("write error:", error);
      console.error("error msg:", error?.message);
    }
  }, [isError, error]);

  return onSubmit;
};
