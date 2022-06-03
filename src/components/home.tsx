import { useAccount, useConnect, useDisconnect } from "wagmi";

const Home = () => {
  const { data: account } = useAccount();
  const { connect, connectors, error, isConnecting, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();

  if (account) {
    return (
      <div>
        <div>Account: {account.address}</div>
        <div>Connected to {account?.connector?.name}</div>
        <button className="btn" onClick={() => disconnect()}>
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div>
      {connectors.map((connector) => (
        <button
          className="btn"
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect(connector)}
        >
          {connector.name}
          {!connector.ready && " (unsupported)"}
          {isConnecting &&
            connector.id === pendingConnector?.id &&
            " (connecting)"}
        </button>
      ))}

      {error && <div>{error.message}</div>}
    </div>
  );
};

export default Home;
