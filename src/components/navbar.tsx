import { useAccount, useDisconnect, useNetwork } from "wagmi";

export const Navbar = () => {
  const { data: account } = useAccount();
  const { disconnect } = useDisconnect();
  const { activeChain } = useNetwork();

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Invisoo</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          <li>
            <a>Account: {account?.address}</a>
          </li>
          {activeChain && (
            <li>
              <a className="mb-3">Network: {activeChain.name}</a>
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
        </ul>
      </div>
    </div>
  );
};
