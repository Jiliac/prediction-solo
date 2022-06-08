import { useState, useEffect } from "react";
import { chain, configureChains, createClient } from "wagmi";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID;
const defaultChain = chain.polygon;

// Set up connectors
export const useClient = () => {
  const [client, setClient] = useState<any>();

  useEffect(() => {
    const { provider, chains } = configureChains(
      [chain.hardhat, chain.localhost, chain.polygonMumbai, chain.polygon],
      [
        alchemyProvider({ alchemyId }),
        jsonRpcProvider({
          rpc: (chain) => {
            if (chain.id !== 31337 && chain.id !== 1337) return null;
            return { http: chain.rpcUrls.default };
          },
        }),
      ]
    );

    const myClient = createClient({
      autoConnect: true,
      provider,
      connectors({ chainId }) {
        console.log("Chain ID:", chainId);
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
