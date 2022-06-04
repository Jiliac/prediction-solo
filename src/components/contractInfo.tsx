import { useState, useEffect } from "react";
import { ethers } from "ethers";

const contractAddr = String(process.env.NEXT_PUBLIC_LOCAL_CONTRACT);

export const ContractInfo = ({ contract }) => {
  const [initP, setP] = useState<string>("");

  useEffect(() => {
    if (!contract) return;
    const f = async () => {
      try {
        const i = await contract.impliedProbability();
        setP(ethers.utils.formatEther(i));
      } catch (e) {
        console.log(e);
      }
    };
    f();
  }, [contract]);

  return (
    <>
      <p>Contract Address: {contractAddr}</p>
      <p>Prob: {initP}</p>
    </>
  );
};
