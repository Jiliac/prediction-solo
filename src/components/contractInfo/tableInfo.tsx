import { useBalance } from "wagmi";

import { InfoProps } from "./contractInfo";

export const TableInfo = ({ contractAddr, market }: InfoProps) => {
  const { data: balanceData } = useBalance({
    addressOrName: contractAddr,
    watch: true,
  });

  return (
    <article className="prose">
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Property</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Contract Address</td>
              <td>{contractAddr}</td>
            </tr>
            <tr>
              <td>Implied Probability</td>
              <td>{market?.probability}</td>
            </tr>
            <tr>
              <td>Name</td>
              <td>{market?.name}</td>
            </tr>
            {balanceData && (
              <tr>
                <td>Contract Balance</td>
                <td>
                  {balanceData?.formatted} {balanceData?.symbol}
                </td>
              </tr>
            )}
            <tr>
              <td>Your Yes Bet</td>
              <td>{market?.userYesBet}</td>
            </tr>
            <tr>
              <td>Your No Bet</td>
              <td>{market?.userNoBet}</td>
            </tr>
            <tr>
              <td>Yes Token Total Supply</td>
              <td>{market?.yesTokenTotSupply}</td>
            </tr>
            <tr>
              <td>No Token Total Supply</td>
              <td>{market?.noTokenTotSupply}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </article>
  );
};
