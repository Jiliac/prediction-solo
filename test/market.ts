import { expect } from "chai";
import { ethers } from "hardhat";

describe("Market", () => {
  it("should do correctly set the address and name", async () => {
    const mockName = "First market name";

    const Market = await ethers.getContractFactory("Market");
    const market = await Market.deploy(mockName);
    const [owner] = await ethers.getSigners();

    await market.deployed();
    expect(await market.name()).to.equal(mockName);
    expect(await market.owner()).to.equal(owner.address);
  });

  it("should have zero balance", async () => {
    const Market = await ethers.getContractFactory("Market");
    const market = await Market.deploy("");
    await market.deployed();

    expect(await ethers.provider.getBalance(market.address)).to.equal(0);
  });

  it("should have the initialized balance", async () => {
    const oneEth = ethers.utils.parseEther("1.0");

    const Market = await ethers.getContractFactory("Market");
    const market = await Market.deploy("", { value: oneEth });

    await market.deployed();
    expect(await ethers.provider.getBalance(market.address)).to.equal(oneEth);
  });
});
