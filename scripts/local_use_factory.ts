import { ethers } from "hardhat";

async function main() {
  const Factory = await ethers.getContractFactory("MarketFactory");
  const factory = Factory.attach("0x5fbdb2315678afecb367f032d93f642f64180aa3");

  console.log("Is factory deployed:", await factory.isDeployed());

  const oneEth = ethers.utils.parseEther("1");
  const prob = ethers.utils.parseEther("0.5");
  const tx = await factory.createMarket("A new market question", prob, {
    value: oneEth,
    gasLimit: 1e7,
  });

  const events = (await tx.wait())?.events;
  const newMarketEvents = events?.filter(
    (e) => e?.event === "NewMarket"
  ) as any;
  const [contractAddr, ownerAddr] = newMarketEvents[0].args;
  console.log(contractAddr, ownerAddr);
  console.log(JSON.stringify(newMarketEvents));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
