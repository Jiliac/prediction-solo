import { useAccount } from "wagmi";

import { useMarketContract } from "../hooks/contract";
import { Connect } from "./connect";
import { ContractInfo } from "./contractInfo";
import { ConnectedInfo } from "./connectedInfo";
import { Betting } from "./betting";

const Home = () => {
  const { data: account } = useAccount();
  const contract = useMarketContract();

  if (!account) return <Connect />;

  return (
    <>
      <ConnectedInfo />
      <ContractInfo contract={contract} />
      {contract && <Betting contract={contract} />}
    </>
  );
};

export default Home;
