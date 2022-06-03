import { useEffect, useState } from "react";
import { ethers } from "ethers";

import MarketContract from "artifacts/contracts/Market.sol/Market.json";

const contractAddress = process.env.NEXT_PUBLIC_LOCAL_CONTRACT as string;
// const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID;

interface Market {
  name: string;
  balance: string;
  probability: number;
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
  const [market, setMarket] = useState<Market | null>(null);

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
      });
    };

    getInfo();
  }, []);

  if (!market)
    return <h1 className="text-5xl font-bold">No market deployed</h1>;

  return (
    <>
      <h1 className="text-5xl font-bold">Hello deployed</h1>
      <div className="py-6">
        <p className="py-2">Question: {`"${market.name}"`}</p>
        <p className="py-2">{market.probability * 100}% Chance</p>
        <p className="py-2">Market Asset: {market.balance}</p>
      </div>

      <div className="rounded-xl shadow-xl py-6 px-6 betbox">
        <div className="form-control mb-6">
          <label className="label mb-2">
            <span className="label-text">Enter amount</span>
          </label>
          <label className="input-group">
            <input
              type="text"
              placeholder="0.01"
              className="input input-bordered"
            />
            <span>BTC</span>
          </label>
        </div>
        <button className="mx-4 btn btn-lg btn-outline btn-success">
          Bet No
        </button>
        <button className="mx-4 btn btn-lg btn-outline btn-error">
          Bet Yes
        </button>
      </div>
    </>
  );
};

export default Home;
