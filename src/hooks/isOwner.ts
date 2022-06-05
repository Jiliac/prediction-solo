import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { useReadMarket } from "./contract";

export const useIsOwner = () => {
  const { data: account } = useAccount();
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const owner = useReadMarket("owner");

  useEffect(() => {
    setIsOwner(owner === account?.address);
  }, [account, owner]);

  return isOwner;
};
