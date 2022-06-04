import { ethers } from "ethers";
import { useAccount } from "wagmi";

import { useMarketContract } from "../hooks/contract";
import { Connect } from "./connect";
import { ContractInfo } from "./contractInfo";
import { ConnectedInfo } from "./connectedInfo";

const Home = () => {
  const { data: account } = useAccount();
  const contract = useMarketContract();

  if (!account) return <Connect />;

  return (
    <article className="prose">
      {contract && (
        <button
          className="btn"
          onClick={async () => {
            try {
              await contract.bet(true, {
                value: ethers.utils.parseEther("3"),
              });
            } catch (e) {
              console.log(e);
            }
          }}
        >
          Bet
        </button>
      )}

      <ContractInfo contract={contract} />
      <ConnectedInfo />
    </article>
  );
};

export default Home;
