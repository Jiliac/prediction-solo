import { useAccount, useContractWrite } from "wagmi";
import MarketContract from "artifacts/contracts/Market.sol/Market.json";

const contractAddr = String(process.env.NEXT_PUBLIC_LOCAL_CONTRACT);

export const useClaim = () => {
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
