import { useContract, useSigner, useContractRead } from "wagmi";
import MarketContract from "artifacts/contracts/Market.sol/Market.json";

const contractAddr = String(process.env.NEXT_PUBLIC_LOCAL_CONTRACT);

export const useMarketInfos = () => {
  return {
    name: useReadMarket("name"),
    impliedProb: useReadMarket("impliedProbability"),
    totalSupply: useReadMarket("totalSupply"),
  };
};

export const useReadMarket = (func: string): any => {
  const { data } = useContractRead(
    { addressOrName: contractAddr, contractInterface: MarketContract.abi },
    func,
    { watch: true }
  );
  return data;
};

export const useMarketContract = () => {
  const { data: signerData } = useSigner();
  const contract = useContract({
    addressOrName: contractAddr,
    contractInterface: MarketContract.abi,
    signerOrProvider: signerData,
  });
  return contract;
};
