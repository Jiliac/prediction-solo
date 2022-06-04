import { useAccount, useDisconnect, useNetwork } from "wagmi";

export const ConnectedInfo = () => {
  const { data: account } = useAccount();
  const { disconnect } = useDisconnect();
  const { activeChain } = useNetwork();

  return (
    <div className="network-card">
      <div className="py-4 px-4">
        {activeChain && <p className="mb-3">Connected to {activeChain.name}</p>}
        <p>Account: {account?.address}</p>
        <button
          className="btn btn-outline btn-primary mt-3"
          onClick={() => disconnect()}
        >
          Disconnect
        </button>
      </div>
    </div>
  );
};
