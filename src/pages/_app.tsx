import { useState, useEffect } from "react";
import type { AppProps } from "next/app";
import { WagmiConfig } from "wagmi";

import { useClient } from "../hooks/providers";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState<boolean>(false);
  const client = useClient();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <WagmiConfig client={client}>
      <Component {...pageProps} />
    </WagmiConfig>
  );
}

export default MyApp;
