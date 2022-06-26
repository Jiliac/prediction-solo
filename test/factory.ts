import { expect } from "chai";
import { ethers } from "hardhat";

describe("MarketFactory", () => {
  const mockProb = ethers.utils.parseEther("0.3");
  const someEth = ethers.utils.parseEther("1.2");

  it("should deploy a market", async () => {
    const Factory = await ethers.getContractFactory("MarketFactory");
    const factory = await Factory.deploy();

    const [owner] = await ethers.getSigners();
    const tx = await factory.createMarket(mockProb, { value: someEth });

    const events = (await tx.wait())?.events;
    expect(events?.length).to.be.above(1);
    const newMarketEvents = events?.filter(
      (e) => e?.event === "NewMarket"
    ) as any;
    expect(newMarketEvents?.length).to.equal(1);
    const [contractAddr, ownerAddr] = newMarketEvents[0].args;
    expect(ownerAddr).to.be.equal(owner.address);
    const Market = await ethers.getContractFactory("TransferableMarket");
    const market = Market.attach(contractAddr);
    expect(await market.owner()).to.equal(owner.address);

    const contractBalance = await ethers.provider.getBalance(contractAddr);
    expect(contractBalance).to.be.equal(someEth);
  });
});
