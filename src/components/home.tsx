import { useAccount, useDisconnect } from "wagmi";

import { Connect } from "./connect";

const Home = () => {
  const { data: account } = useAccount();
  const { disconnect } = useDisconnect();

  if (!account) return <Connect />;

  return (
    <article className="prose">
      <p>Account: {account.address}</p>
      <p>Connected to {account?.connector?.name}</p>
      <button
        className="btn btn-outline btn-primary"
        onClick={() => disconnect()}
      >
        Disconnect
      </button>
    </article>
  );
};

export default Home;
