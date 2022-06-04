import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useAccount, useSigner, useContract } from "wagmi";

import { Connect } from "./connect";
import { ConnectedInfo } from "./connectedInfo";

import MarketContract from "artifacts/contracts/Market.sol/Market.json";
const contractAddr = String(process.env.NEXT_PUBLIC_LOCAL_CONTRACT);

const Home = () => {
  const [initP, setP] = useState<string>("");
  const { data: account } = useAccount();

  const { data: signerData } = useSigner();
  const contract = useContract({
    addressOrName: contractAddr,
    contractInterface: MarketContract.abi,
    signerOrProvider: signerData,
  });

  useEffect(() => {
    if (!contract) return;
    const f = async () => {
      try {
        const i = await contract.impliedProbability();
        console.log(i);
        setP(ethers.utils.formatEther(i));
      } catch (e) {
        console.log(e);
      }
    };
    f();
  }, [contract]);

  if (!account) return <Connect />;

  return (
    <article className="prose">
      {contract && (
        <button
          className="btn"
          onClick={async () => {
            await contract.bet(true);
            // await contract.bet(true, { value: ethers.utils.parseEther("3") });
          }}
        >
          Bet
        </button>
      )}
      <p>Contract Address: {contractAddr}</p>
      <p>Prob: {initP}</p>

      <ConnectedInfo />
    </article>
  );
};

export default Home;
