import { useAccount, useContract, useSigner, useContractRead } from "wagmi";
import MarketContract from "artifacts/contracts/Market.sol/Market.json";

const contractAddr = String(process.env.NEXT_PUBLIC_LOCAL_CONTRACT);

export const useMarketInfos = () => {
  const { data: account } = useAccount();

  return {
    name: useReadMarket("name"),
    impliedProb: useReadMarket("impliedProbability"),
    totalSupply: useReadMarket("totalSupply"),
    userBalance: useReadMarket("tokenBalanceOf", [account?.address]),
  };
};

export const useReadMarket = (func: string, args?: Array<any>): any => {
  const { data: account } = useAccount();

  const { data } = useContractRead(
    { addressOrName: contractAddr, contractInterface: MarketContract.abi },
    func,
    {
      overrides: { from: account?.address },
      watch: true,
      args: args,
    }
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
