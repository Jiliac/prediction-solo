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

      <div className="mt-9 shadow-md rounded-md bg-slate-100">
        <p className="mb-0 pt-3">What's a Wallet? 🤔</p>
        <p className="mt-0 pb-3">
          Checkout this <a href="https://metamask.io/">link</a> on how to get
          started.
        </p>
      </div>
    </article>
  );
};

export const NotLive = () => {
  return (
    <div className="container">
      <article className="prose">
        <h2>Contract is not live on this network.</h2>
        <p>
          Checkout{" "}
          <a href="https://support.opensea.io/hc/en-us/articles/1500011368842-How-can-I-switch-my-wallet-to-blockchains-like-Polygon">
            Polygon
          </a>{" "}
          for the a live deployment.
        </p>
      </article>
    </div>
  );
};
