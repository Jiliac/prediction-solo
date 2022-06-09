import { useAccount, useContract, useSigner, useContractRead } from "wagmi";
import MarketContract from "artifacts/contracts/Market.sol/Market.json";

export const useMarketInfos = (contractAddr: string) => {
  const { data: account } = useAccount();

  return {
    name: useReadMarket(contractAddr, "name"),
    impliedProb: useReadMarket(contractAddr, "impliedProbability"),
    totalSupply: useReadMarket(contractAddr, "totalSupply"),
    userBalance: useReadMarket(contractAddr, "tokenBalanceOf", [
      account?.address,
    ]),
  };
};

export const useReadMarket = (
  contractAddr: string,
  func: string,
  args?: Array<any>
): any => {
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

export const useMarketContract = (contractAddr: string) => {
  const { data: signerData } = useSigner();
  const contract = useContract({
    addressOrName: contractAddr,
    contractInterface: MarketContract.abi,
    signerOrProvider: signerData,
  });
  return contract;
};
