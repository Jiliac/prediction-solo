import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";

import { Connect, DApp } from "../components";
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

  return <DApp contractAddr={contractAddr} />;
};

export default ContractPage;
