import { useState } from "react";
import { useContractEvent } from "wagmi";
import { ethers, BigNumber } from "ethers";

import MarketContract from "artifacts/contracts/Market.sol/Market.json";

const contractAddr = String(process.env.NEXT_PUBLIC_LOCAL_CONTRACT);

interface Event {
  outcome: boolean;
  betterAddr: string;
  amount: string;
  betSize: string;
  yesTot: string;
  noTot: string;
  ammYes: string;
  ammNo: string;
}

const roundFormatEther = (ether: BigNumber): string => {
  const res = ethers.utils.formatEther(ether);
  const rounded = Math.round(Number(res) * 1e2) / 1e2;
  return rounded.toString();
};

const parseEvent = (rawEvent: any): Event => {
  const args = rawEvent[8].args;
  const parsedEvent: Event = {
    outcome: args.outcome,
    betterAddr: args.better,
    amount: roundFormatEther(args.amount),
    betSize: roundFormatEther(args.betSize),
    yesTot: roundFormatEther(args.yesTot),
    noTot: roundFormatEther(args.noTot),
    ammYes: roundFormatEther(args.ammYes),
    ammNo: roundFormatEther(args.ammNo),
  };
  return parsedEvent;
};

export const Events = () => {
  const [events, setEvents] = useState<Array<Event>>([]);
  useContractEvent(
    { addressOrName: contractAddr, contractInterface: MarketContract.abi },
    "BetMade",
    (newEvent) => {
      const e = parseEvent(newEvent);
      console.log(e);
      setEvents((oldEvents) => [...oldEvents, e]);
    }
  );

  return (
    <article className="prose">
      <h2 className="mb-0 pb-0 mt-4">Events</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Bet</th>
              <th>Amount</th>
              <th>Bet Size</th>
              <th>AMM YES holding</th>
              <th>AMM NO holding</th>
            </tr>
          </thead>
          <tbody>
            {events.map((e) => (
              <tr>
                <th>{e.outcome ? "Yes" : "No"}</th>
                <th>{e.amount} ETH</th>
                <th>{e.betSize}</th>
                <th>{e.ammYes}</th>
                <th>{e.ammNo}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
};
