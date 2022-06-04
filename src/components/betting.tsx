import { useState } from "react";
import { ethers } from "ethers";

export const Betting = ({ contract }: any) => {
  const [betSize, setBetSize] = useState<string>("");

  const doBet = async (outcome: boolean) => {
    if (!betSize) return;

    const betSizeEth = ethers.utils.parseEther(betSize);
    await contract.bet(outcome, { value: betSizeEth });
    setBetSize("");
  };

  return (
    <div className="rounded-xl shadow-xl py-6 px-6 betbox">
      <div className="form-control mb-6">
        <label className="label mb-2">
          <span className="label-text">Amount:</span>
        </label>
        <label className="input-group">
          <input
            type="text"
            className="input input-bordered"
            placeholder="0.01"
            value={betSize}
            onChange={(e) => setBetSize(e.target.value)}
          />
          <span>Matic</span>
        </label>
      </div>

      <button
        className="mx-4 btn btn-lg btn-outline btn-success"
        onClick={() => doBet(true)}
      >
        Bet Yes
      </button>
      <button
        onClick={() => doBet(false)}
        className="mx-4 btn btn-lg btn-outline btn-error"
      >
        Bet No
      </button>
    </div>
  );
};
