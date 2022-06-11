import { ethers, run } from "hardhat";

async function main() {
  await run("verify:verify", {
    address: "0xA7FcD00A9295396F444851AF479262ba0398fb86",
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
