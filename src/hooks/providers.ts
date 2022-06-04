import { useState, useEffect } from "react";
import { providers } from "ethers";
import { chain, createClient, defaultChains } from "wagmi";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

// API key for Ethereum node
// Two popular services are Alchemy (alchemy.com) and Infura (infura.io)
const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID;

const chains = defaultChains;
const defaultChain = chain.mainnet;

const ethProvider = new providers.JsonRpcProvider(
  "http://127.0.0.1:8545", // rpc url
  31337 // chainId (local)
);

// Set up connectors
export const useClient = () => {
  const [client, setClient] = useState<any>();

  useEffect(() => {
    const myClient = createClient({
      autoConnect: true,
      provider: (config) => {
        if (!config || config.chainId) return ethProvider;
        if (config.chainId === 31337) return ethProvider;
        return new providers.AlchemyProvider(config.chainId, alchemyId);
      },
      connectors({ chainId }) {
        const chain = chains.find((x) => x.id === chainId) ?? defaultChain;
        const rpcUrl = chain.rpcUrls.alchemy
          ? `${chain.rpcUrls.alchemy}/${alchemyId}`
          : chain.rpcUrls.default;

        return [
          new MetaMaskConnector({ chains }),
          new CoinbaseWalletConnector({
            chains,
            options: {
              appName: "wagmi",
              chainId: chain.id,
              jsonRpcUrl: rpcUrl,
            },
          }),
          new WalletConnectConnector({
            chains,
            options: {
              qrcode: true,
              rpc: { [chain.id]: rpcUrl },
            },
          }),
        ];
      },
    });

    setClient(myClient);
  }, []);

  return client;
};
