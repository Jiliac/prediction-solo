import { NextPage } from "next";
import { useAccount } from "wagmi";

import { NotLive, Connect, NewMarketForm } from "src/components";
import { useContractAddr, useIsFactoryLive } from "src/hooks/contractAddress";

const NewMarket: NextPage = () => {
  const { data: account } = useAccount();
  const contractAddr = useContractAddr();
  const isLive = useIsFactoryLive(contractAddr);

  if (!account) return <Connect />;
  if (!isLive) return <NotLive />;

  return (
    <div className="w-screen">
      <div className="max-w-xl m-auto">
        <article className="prose">
          <h1>Make a New Market</h1>
        </article>

        <NewMarketForm contractAddr={contractAddr} />
      </div>
    </div>
  );
};

export default NewMarket;
