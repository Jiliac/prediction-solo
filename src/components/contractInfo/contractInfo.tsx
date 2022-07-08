import { useMarketInfos } from "src/hooks";
import { Market } from "./market";
import { SimpleInfo } from "./simpleInfo";
import { TableInfo } from "./tableInfo";

export interface InfoProps {
  contractAddr: string;
  market: Market | undefined;
}

export const ContractInfo = ({
  contractAddr,
  old,
}: {
  contractAddr: string;
  old?: boolean;
}) => {
  const market = useMarketInfos(contractAddr);
  if (!market) <h2>Contract but no market?</h2>;

  if (old) return <TableInfo contractAddr={contractAddr} market={market} />;
  return <SimpleInfo contractAddr={contractAddr} market={market} />;
};
