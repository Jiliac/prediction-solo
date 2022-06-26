import { ethers } from "hardhat";

describe("MarketFactory", () => {
  const mockName = "First market name";
  const mockProb = ethers.utils.parseEther("0.3");
  const someEth = ethers.utils.parseEther("1.2");

  it("should deploy a market", async () => {
    const Factory = await ethers.getContractFactory("MarketFactory");
    const factory = await Factory.deploy();
  });
});
