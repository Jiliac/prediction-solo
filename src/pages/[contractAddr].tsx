import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";

import { Connect, DApp, NotLive } from "../components";
import { useIsContractLive } from "../hooks";

const ContractPage: NextPage = () => {
  const { data: account } = useAccount();
  const { query } = useRouter();
  const contractAddr = query?.contractAddr as string;
  const isLive = useIsContractLive(contractAddr);

  if (!account) return <Connect />;
  if (!isLive) return <NotLive />;

  return <DApp contractAddr={contractAddr} />;
};

export default ContractPage;
