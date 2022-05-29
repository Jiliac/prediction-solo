import { useEffect, useState } from "react";
import { ethers } from "ethers";

import MarketContract from "artifacts/contracts/Market.sol/Market.json";

const contractAddress = process.env.NEXT_PUBLIC_LOCAL_CONTRACT as string;
// const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID;

const Home = () => {
  const [marketName, setName] = useState<string>("");
  const [marketBalance, setBalance] = useState<string>("NaN");

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      contractAddress,
      MarketContract.abi,
      signer
    );

    const getInfo = async () => {
      const name = await contract.name();
      const balance = await provider.getBalance(contractAddress);
      setName(name);
      setBalance(ethers.utils.formatEther(balance));
    };

    getInfo();
  }, []);

  return (
    <>
      <h1 className="text-5xl font-bold">Hello there</h1>
      <p className="py-6">
        Name: {`"${marketName}"`}, and balance: {marketBalance}
      </p>
    </>
  );
};

export default Home;
