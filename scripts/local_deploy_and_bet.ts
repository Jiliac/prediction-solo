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

  // We get the contract to deploy
  const Market = await ethers.getContractFactory("Market");
  const probability = ethers.utils.parseEther("0.3");
  const market = await Market.deploy("The first market", probability, {
    value: ethers.utils.parseEther("1.2"),
  });

  await market.deployed();
  console.log("Market deployed to:", market.address);

  const payedForBet = ethers.utils.parseEther("0.1");
  const yesBetSize = await market.getYesBetSize(payedForBet);
  console.log("Expected YES bet size:", ethers.utils.formatEther(yesBetSize));

  const [, better] = await ethers.getSigners();
  const txY = await market.connect(better).bet(true, { value: payedForBet });
  const yesReceipt = await txY.wait();
  console.log("Yes events:", yesReceipt.events);

  const a = await market.initProbability();
  const k = await market.ammConstant();
  const [yesTot, noTot] = await market.tokenBalanceOf(market.address);
  const yesTotF = ethers.utils.formatEther(yesTot);
  const noTotF = ethers.utils.formatEther(noTot);
  console.log(`a: ${a} - k: ${k} - y: ${yesTotF} - n: ${noTotF}`);

  const noBetSize = await market.getNoBetSize(payedForBet);
  console.log("Expected NO bet size:", ethers.utils.formatEther(noBetSize));
  const txN = await market.connect(better).bet(false, { value: payedForBet });
  const noReceipt = await txN.wait();
  console.log("No events:", noReceipt.events);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
