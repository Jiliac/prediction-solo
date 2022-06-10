import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";

import { Connect, DAppV1 } from "../components";
import { useIsContractLive } from "../hooks";

const ContractPage: NextPage = () => {
  const { data: account } = useAccount();
  const { query } = useRouter();
  const contractAddr = query?.contractAddr as string;
  const isLive = useIsContractLive(contractAddr);

  if (!account) return <Connect />;

  if (!isLive)
    return (
      <div className="container">
        <article className="prose">
          <h2>Contract is not live</h2>
        </article>
      </div>
    );

  return <DAppV1 contractAddr={contractAddr} />;
};

export default ContractPage;
