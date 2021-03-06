import { ethers } from "hardhat";

async function main() {
  const Factory = await ethers.getContractFactory("MarketFactory");
  const factory = await Factory.deploy({ gasLimit: 1e7 });
  await factory.deployed();
  console.log("Factory deployed to:", factory.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
