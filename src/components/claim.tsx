import { useState, useEffect } from "react";
import { utils, BigNumber } from "ethers";

import { useReadMarket } from "../hooks/contract";
import { useClaim } from "../hooks/claimReward";

const roundFormatEther = (ether: BigNumber): string => {
  const res = utils.formatEther(ether);
  const rounded = Math.round(Number(res) * 1e3) / 1e3;
  return rounded.toString();
};

export const Claim = () => {
  const [claimableReward, setClaim] = useState<string>("");
  const claimableRewardBN = useReadMarket("getRewardAmount");
  const claim = useClaim();

  useEffect(() => {
    if (!claimableRewardBN) return;
    setClaim(roundFormatEther(claimableRewardBN));
  }, [claimableRewardBN]);

  if (!claimableReward) return null;

  return (
    <div className="container">
      <div className="rounded-xl shadow-xl py-6 px-6 betbox">
        <article className="prose">
          <h2>You can claim {claimableReward}</h2>
          <button
            className="mx-4 btn btn-lg btn-success"
            onClick={() => claim()}
          >
            Claim your Reward
          </button>
        </article>
      </div>
    </div>
  );
};
