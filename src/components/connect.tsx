import { useConnect } from "wagmi";

export const Connect = () => {
  const { connect, connectors, error, isConnecting, pendingConnector } =
    useConnect();

  return (
    <article className="prose">
      <h1>Connect your Wallet</h1>
      <div className="flex flex-col">
        {connectors.map((connector) => (
          <button
            className="btn btn-primary btn-lg my-4 px-8"
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
    </article>
  );
};
