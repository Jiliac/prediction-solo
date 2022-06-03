import type { AppProps } from "next/app";
import { WagmiConfig } from "wagmi";

import { client } from "../utils/provider";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <Component {...pageProps} />;
    </WagmiConfig>
  );
}

export default MyApp;
