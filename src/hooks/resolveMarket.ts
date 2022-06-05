import { useContractWrite } from "wagmi";
import MarketContract from "artifacts/contracts/Market.sol/Market.json";

const contractAddr = String(process.env.NEXT_PUBLIC_LOCAL_CONTRACT);

export const useResolve = () => {
  const { write } = useContractWrite(
    {
      addressOrName: contractAddr,
      contractInterface: MarketContract.abi,
    },
    "resolve"
  );

  return write;
};
