import { useState, useEffect } from "react";
import { utils, BigNumber } from "ethers";

import { useReadMarket, useClaim } from "../hooks";

const roundFormatEther = (ether: BigNumber): string => {
  const res = utils.formatEther(ether);
  const rounded = Math.round(Number(res) * 1e3) / 1e3;
  return rounded.toString();
};

export const Claim = ({ contractAddr }: { contractAddr: string }) => {
  const [claimableReward, setClaim] = useState<string>("");
  const claimableRewardBN = useReadMarket(contractAddr, "getRewardAmount");
  const claim = useClaim(contractAddr);

  useEffect(() => {
    if (!claimableRewardBN) return;
    setClaim(roundFormatEther(claimableRewardBN));
  }, [claimableRewardBN]);

  if (!claimableReward) return null;

  return (
    <div className="rounded-xl shadow-xl py-6 px-6 mt-9 betbox">
      <article className="prose">
        <h2>You can claim {claimableReward}</h2>
        {Number(claimableReward) > 0 && (
          <button
            className="mx-4 btn btn-lg btn-success"
            onClick={() => claim()}
          >
            Claim your Reward
          </button>
        )}
      </article>
    </div>
  );
};
