import { expect } from "chai";
import { ethers } from "hardhat";

describe("TransferableMarket", () => {
  const mockProb = ethers.utils.parseEther("0.3");
  const someEth = ethers.utils.parseEther("1.2");

  it("Owner should be the one set by the constructor", async () => {
    const Market = await ethers.getContractFactory("TransferableMarket");
    const [caller, origin] = await ethers.getSigners();
    const market = await Market.deploy(mockProb, origin.address, {
      value: someEth,
    });

    await market.deployed();
    expect(await market.owner()).to.not.equal(caller.address);
    expect(await market.owner()).to.equal(origin.address);
  });

  it("Transfer should be disabled post-deployment", async () => {
    const Market = await ethers.getContractFactory("TransferableMarket");
    const market = await Market.deploy(mockProb, ethers.constants.AddressZero, {
      value: someEth,
    });

    await market.deployed();
    const [caller] = await ethers.getSigners();
    expect(await market.owner()).to.equal(caller.address);
  });
});
