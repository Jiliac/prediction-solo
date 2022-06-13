import { ethers, run } from "hardhat";

const { NEXT_PUBLIC_POLYGON_CONTRACT } = process.env;

async function main() {
  await run("verify:verify", {
    address: NEXT_PUBLIC_POLYGON_CONTRACT,
    constructorArguments: [
      "Will G.R.R. Martin publish an ASOIAF book in 2022?",
      ethers.utils.parseEther("0.2"),
    ],
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
