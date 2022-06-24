import type { NextPage } from "next";
import { useAccount } from "wagmi";

import { NotLive, Connect, DApp } from "../components";
import { useIsContractLive, useContractAddr } from "../hooks/contractAddress";

const Index: NextPage = () => {
  const { data: account } = useAccount();
  const contractAddr = useContractAddr();
  const isLive = useIsContractLive(contractAddr);

  if (!account) return <Connect />;

  if (!isLive) return <NotLive />;

  return <DApp contractAddr={contractAddr} />;
};

export default Index;
