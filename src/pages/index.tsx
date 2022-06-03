import type { NextPage } from "next";
import Head from "next/head";

import Home from "../components/home";

const Index: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Valentin test app</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <div className="hero min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <Home />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
