import { useContract, useSigner } from "wagmi";
import MarketContract from "artifacts/contracts/Market.sol/Market.json";

const contractAddr = String(process.env.NEXT_PUBLIC_LOCAL_CONTRACT);

export const useMarketContract = () => {
  const { data: signerData } = useSigner();
  const contract = useContract({
    addressOrName: contractAddr,
    contractInterface: MarketContract.abi,
    signerOrProvider: signerData,
  });
  return contract;
};
