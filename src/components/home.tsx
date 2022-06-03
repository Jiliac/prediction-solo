import { useEffect, useState } from "react";
import { ethers } from "ethers";

import MarketContract from "artifacts/contracts/Market.sol/Market.json";

const contractAddress = process.env.NEXT_PUBLIC_LOCAL_CONTRACT as string;
// const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID;

interface Market {
  name: string;
  balance: string;
  probability: number;

  contract: any;
}

const createContract = () => {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    contractAddress,
    MarketContract.abi,
    signer
  );
  return { provider, contract };
};

const Home = () => {
  const [market, setMarket] = useState<Market | undefined>(undefined);
  const [betSize, setBetSize] = useState<number | undefined>(undefined);

  useEffect(() => {
    const { provider, contract } = createContract();

    const getInfo = async () => {
      const balance = await provider.getBalance(contractAddress);
      const name = await contract.name();
      const probabilityBN = await contract.impliedProbability();
      const probability = Number(ethers.utils.formatEther(probabilityBN));

      setMarket({
        name: name,
        balance: ethers.utils.formatEther(balance),
        probability: probability,
        contract: contract,
      });
    };

    getInfo();
  }, []);

  if (!market)
    return <h1 className="text-5xl font-bold">No market deployed</h1>;

  return (
    <>
      <h1 className="text-5xl font-bold">Market Deployed</h1>
      <div className="py-6">
        <p className="py-2">Question: {`"${market.name}"`}</p>
        <p className="py-2">{market.probability * 100}% Chance</p>
        <p className="py-2">Market Asset: {market.balance}</p>
      </div>

      <div className="rounded-xl shadow-xl py-6 px-6 betbox">
        <div className="form-control mb-6">
          <label className="label mb-2">
            <span className="label-text">Amount:</span>
          </label>
          <label className="input-group">
            <input
              type="number"
              className="input input-bordered"
              placeholder="0.01"
              value={betSize}
              onChange={(e) => setBetSize(Number(e.target.value))}
            />
            <span>Matic</span>
          </label>
        </div>

        <button
          className="mx-4 btn btn-lg btn-outline btn-success"
          onClick={async () => {
            if (!betSize) return;
            await market.contract.bet(true, {
              value: ethers.utils.parseEther(betSize.toString()),
            });
          }}
        >
          Bet Yes
        </button>
        <button className="mx-4 btn btn-lg btn-outline btn-error">
          Bet No
        </button>
      </div>
    </>
  );
};

export default Home;
