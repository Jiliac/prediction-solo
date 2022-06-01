import { expect } from "chai";
import { ethers } from "hardhat";

describe("Market", () => {
  const mockName = "First market name";
  const mockProb = 100;
  const someEth = ethers.utils.parseEther("0.8");

  it("should do correctly set the address and name", async () => {
    const Market = await ethers.getContractFactory("Market");
    const market = await Market.deploy(mockName, mockProb, { value: someEth });
    const [owner] = await ethers.getSigners();

    await market.deployed();
    expect(await market.name()).to.equal(mockName);
    expect(await market.owner()).to.equal(owner.address);
  });

  it("should have the initialized balance", async () => {
    const Market = await ethers.getContractFactory("Market");
    const market = await Market.deploy("", mockProb, { value: someEth });

    await market.deployed();
    expect(await market.initProbability()).to.equal(mockProb);
    expect(await ethers.provider.getBalance(market.address)).to.equal(someEth);
  });

  it("should fail if the probably is too low", async () => {
    const Market = await ethers.getContractFactory("Market");
    await expect(Market.deploy(mockName, 0)).to.be.revertedWith(
      "Need a strictly positive initial probability"
    );
  });

  it("should fail if the probably is too high", async () => {
    const Market = await ethers.getContractFactory("Market");
    await expect(Market.deploy(mockName, 10000)).to.be.revertedWith(
      "Probability range from 0 to 10000"
    );
  });

  it("should fail if the probably is too high", async () => {
    const Market = await ethers.getContractFactory("Market");
    await expect(Market.deploy(mockName, mockProb)).to.be.revertedWith(
      "Need liquidity to be initialized"
    );
  });

  it("should mint YES and NO tokens", async () => {
    const Market = await ethers.getContractFactory("Market");
    const market = await Market.deploy("", mockProb, { value: someEth });

    await market.deployed();
    const [yesTot, noTot] = await market.totalSupply();
    expect(yesTot).to.equal(someEth);
    expect(noTot).to.equal(someEth);
  });
});
