import { useContractWrite } from "wagmi";
import MarketContract from "artifacts/contracts/Market.sol/Market.json";

export const useBet = (contractAddr: string) => {
  const { write } = useContractWrite(
    {
      addressOrName: contractAddr,
      contractInterface: MarketContract.abi,
    },
    "bet"
  );

  return write;
};
