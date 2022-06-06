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

  const Market = await ethers.getContractFactory("Market");
  const market = await Market.deploy(
    "Will G.R.R. Martin publish in 2022?",
    ethers.utils.parseEther("0.3"),
    {
      value: ethers.utils.parseEther(".7"),
    }
  );

  await market.deployed();
  console.log("Market deployed to:", market.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
