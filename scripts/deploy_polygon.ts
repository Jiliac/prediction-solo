// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  const arg1 = "Will G.R.R. Martin publish an ASOIAF book in 2022?";
  const arg2 = ethers.utils.parseEther("0.2");

  const Market = await ethers.getContractFactory("Market");
  const market = await Market.deploy(arg1, arg2, {
    value: ethers.utils.parseEther("20"),
  });

  await market.deployed();
  console.log("Market deployed to:", market.address);

  // await run("verify:verify", {
  //   address: market.address,
  //   constructorArguments: [arg1, arg2],
  // });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
