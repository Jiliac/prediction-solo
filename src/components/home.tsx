import { useState, useEffect } from "react";
import { ethers } from "ethers";
import {
  useAccount,
  useDisconnect,
  useContract,
  useNetwork,
  useSigner,
} from "wagmi";

import MarketContract from "artifacts/contracts/Market.sol/Market.json";
import { Connect } from "./connect";

const contractAddr = String(process.env.NEXT_PUBLIC_LOCAL_CONTRACT);

const Home = () => {
  const [initP, setP] = useState<string>("");

  const { data: account } = useAccount();
  const { disconnect } = useDisconnect();

  const { activeChain } = useNetwork();
  const { data: signerData } = useSigner();
  const contract = useContract({
    addressOrName: contractAddr,
    contractInterface: MarketContract.abi,
    signerOrProvider: signerData,
  });

  useEffect(() => {
    if (!contract) return;
    const f = async () => {
      const i = await contract.impliedProbability();
      console.log(i);
      setP(ethers.utils.formatEther(i));
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
      <p>Account: {account.address}</p>
      {activeChain && <p>Connected to {activeChain.name}</p>}
      <button
        className="btn btn-outline btn-primary"
        onClick={() => disconnect()}
      >
        Disconnect
      </button>
    </article>
  );
};

export default Home;
