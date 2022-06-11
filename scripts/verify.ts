import { ethers, run } from "hardhat";

async function main() {
  await run("verify:verify", {
    address: "0x79144EEe6483953a0E97Ca21e6baC3A2b1015FBD",
    constructorArguments: [
      "Will G.R.R. Martin publish an ASOIAF book in 2022?",
      ethers.utils.parseEther("0.3"),
    ],
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
