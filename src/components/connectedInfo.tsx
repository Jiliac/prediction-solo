import { useAccount, useDisconnect, useNetwork } from "wagmi";

export const ConnectedInfo = () => {
  const { data: account } = useAccount();
  const { disconnect } = useDisconnect();
  const { activeChain } = useNetwork();

  return (
    <>
      <p>Account: {account?.address}</p>
      {activeChain && <p>Connected to {activeChain.name}</p>}
      <button
        className="btn btn-outline btn-primary"
        onClick={() => disconnect()}
      >
        Disconnect
      </button>
    </>
  );
};
