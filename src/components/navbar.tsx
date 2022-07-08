import Link from "next/link";
import { useAccount, useDisconnect, useNetwork } from "wagmi";

const printAddr = (fullAddr: string | undefined): string => {
  if (!fullAddr) return "";
  if (fullAddr.length < 10) return fullAddr;
  const prefix = fullAddr.substring(0, 5);
  const suffix = fullAddr.substring(fullAddr.length - 3);
  return `${prefix}...${suffix}`;
};

const ConnectedItems = ({ address }: { address: string | undefined }) => {
  const { disconnect } = useDisconnect();
  const { activeChain } = useNetwork();

  return (
    <>
      <li>
        <a className="bg-base-200 mr-2">{printAddr(address)}</a>
      </li>
      {activeChain && (
        <li>
          <a className="bg-base-200">{activeChain.name}</a>
        </li>
      )}
      <li>
        <button
          className="btn btn-outline btn-primary ml-2"
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
      <div className="navbar-start">
        <a className="btn btn-ghost normal-case text-xl">Invisoo</a>
      </div>
      <div className="navbar-center">
        <Link href="/">
          <a className="btn btn-ghost normal-case text-xl">Home</a>
        </Link>
        <div className="divider divider-horizontal py-2 mx-1"></div>
        <Link href="/new">
          <a className="btn btn-ghost normal-case text-xl">Create a Question</a>
        </Link>
      </div>
      <div className="navbar-end">
        <ul className="menu menu-horizontal p-0">
          {account && <ConnectedItems address={account?.address} />}
        </ul>
      </div>
    </div>
  );
};
