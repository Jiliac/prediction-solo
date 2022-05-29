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
});
