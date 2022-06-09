import { useContractWrite } from "wagmi";
import MarketContract from "artifacts/contracts/Market.sol/Market.json";

export const useResolve = (contractAddr: string) => {
  const { write } = useContractWrite(
    {
      addressOrName: contractAddr,
      contractInterface: MarketContract.abi,
    },
    "resolve"
  );

  return write;
};
