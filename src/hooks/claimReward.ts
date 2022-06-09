import { useAccount, useContractWrite } from "wagmi";
import MarketContract from "artifacts/contracts/Market.sol/Market.json";

export const useClaim = (contractAddr: string) => {
  const { data: account } = useAccount();
  const { write } = useContractWrite(
    {
      addressOrName: contractAddr,
      contractInterface: MarketContract.abi,
    },
    "claimReward",
    {
      overrides: { from: account?.address },
    }
  );

  return write;
};
