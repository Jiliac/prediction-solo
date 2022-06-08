import { useAccount, useDisconnect, useNetwork } from "wagmi";

const ConnectedItems = ({ address }: { address: string | undefined }) => {
  const { disconnect } = useDisconnect();
  const { activeChain } = useNetwork();

  return (
    <>
      <li>
        <a>Account: {address}</a>
      </li>
      {activeChain && (
        <li>
          <a>Network: {activeChain.name}</a>
        </li>
      )}
      <li>
        <button
          className="btn btn-outline btn-primary"
          onClick={() => disconnect()}
        >
          Disconnect
        </button>
      </li>
    </>
  );
};

export const Navbar = () => {
  const { data: account } = useAccount();

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Invisoo</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          {account && <ConnectedItems address={account?.address} />}
        </ul>
      </div>
    </div>
  );
};
