import { useState, useEffect } from "react";
import { useAccount, useContractRead, useNetwork } from "wagmi";

import MarketContract from "artifacts/contracts/Market.sol/Market.json";
import FactoryContract from "artifacts/contracts/MarketFactory.sol/MarketFactory.json";

export const useIsFactoryLive = (contractAddr: string) => {
  const [isLive, setIsLive] = useState<boolean>(false);
  const { data: account } = useAccount();
  const { isError, isLoading, error } = useContractRead(
    { addressOrName: contractAddr, contractInterface: FactoryContract.abi },
    "isDeployed",
    {
      overrides: { from: account?.address },
    }
  );

  useEffect(() => {
    if (isError) {
      console.error(error);
    }

    if (!contractAddr || !account || isLoading || isError) {
      setIsLive(false);
    } else {
      setIsLive(true);
    }
  }, [contractAddr, account, isLoading, isError]);

  return isLive;
};

export const useIsContractLive = (contractAddr: string) => {
  const [isLive, setIsLive] = useState<boolean>(false);
  const { data: account } = useAccount();
  const { isError, isLoading } = useContractRead(
    { addressOrName: contractAddr, contractInterface: MarketContract.abi },
    "resolved",
    {
      overrides: { from: account?.address },
    }
  );

  useEffect(() => {
    if (!contractAddr || !account || isLoading || isError) {
      setIsLive(false);
    } else {
      setIsLive(true);
    }
  }, [contractAddr, account, isLoading, isError]);

  return isLive;
};

export const useContractAddr = () => {
  const { activeChain, isLoading, error } = useNetwork();
  const chainId = activeChain?.id;
  const [contractAddr, setContractAddr] = useState<string>("");

  useEffect(() => {
    if (isLoading || error || !chainId) {
      setContractAddr("");
      return;
    }

    switch (chainId) {
      case 31337 || 1337:
        setContractAddr(String(process.env.NEXT_PUBLIC_LOCAL_CONTRACT));
        break;

      case 80001:
        setContractAddr(String(process.env.NEXT_PUBLIC_MUMBAI_CONTRACT));
        break;

      case 137:
        setContractAddr(String(process.env.NEXT_PUBLIC_POLYGON_CONTRACT));
        break;

      default:
        setContractAddr("");
    }
  }, [isLoading, error, chainId]);

  return contractAddr;
};
