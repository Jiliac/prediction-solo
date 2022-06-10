import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { useReadMarket } from "./contractRead";

export const useIsOwner = (contractAddr: string) => {
  const { data: account } = useAccount();
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const owner = useReadMarket(contractAddr, "owner");

  useEffect(() => {
    setIsOwner(owner === account?.address);
  }, [account, owner]);

  return isOwner;
};
