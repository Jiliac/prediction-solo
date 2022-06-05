import { expect } from "chai";
import { ethers } from "hardhat";

describe("Market", () => {
  const mockName = "First market name";
  const mockProb = ethers.utils.parseEther("0.3");
  const someEth = ethers.utils.parseEther("1.2");

  describe("initialization", () => {
    it("should do correctly set the address and name", async () => {
      const Market = await ethers.getContractFactory("Market");
      const market = await Market.deploy(mockName, mockProb, {
        value: someEth,
      });
      const [owner] = await ethers.getSigners();

      await market.deployed();
      expect(await market.name()).to.equal(mockName);
      expect(await market.owner()).to.equal(owner.address);
      expect(await market.impliedProbability()).to.equal(mockProb);
    });

    it("should have the initialized balance", async () => {
      const Market = await ethers.getContractFactory("Market");
      const market = await Market.deploy("", mockProb, { value: someEth });

      await market.deployed();
      expect(await market.initProbability()).to.equal(mockProb);
      expect(await ethers.provider.getBalance(market.address)).to.equal(
        someEth
      );
    });

    it("should fail if the probably is too low", async () => {
      const Market = await ethers.getContractFactory("Market");
      await expect(Market.deploy(mockName, 0)).to.be.revertedWith(
        "Need a strictly positive initial probability"
      );
    });

    it("should fail if the probably is too high", async () => {
      const overMaxProb = ethers.utils.parseEther("1.2");
      const Market = await ethers.getContractFactory("Market");
      await expect(Market.deploy(mockName, overMaxProb)).to.be.revertedWith(
        "Probability between 0 and 1 strictly. 18 decimals."
      );
    });

    it("should fail with a low ETH amount", async () => {
      const lowEth = ethers.utils.parseEther(".99");
      const Market = await ethers.getContractFactory("Market");

      await expect(
        Market.deploy("", mockProb, { value: lowEth })
      ).to.be.revertedWith("Need enough liquidity to be initialized");
    });
  });

  describe("betting", () => {
    it("should mint YES and NO tokens", async () => {
      const Market = await ethers.getContractFactory("Market");
      const market = await Market.deploy("", mockProb, { value: someEth });

      await market.deployed();
      const [yesTot, noTot] = await market.totalSupply();
      expect(yesTot).to.equal(someEth);
      expect(noTot).to.equal(someEth);
    });

    it("should correctly set the AMM constant", async () => {
      const Market = await ethers.getContractFactory("Market");
      const market = await Market.deploy("", mockProb, { value: someEth });

      await market.deployed();
      const k = await market.ammConstant();
      expect(k).to.be.closeTo(someEth, 20);
    });

    it("should compute the correct bet size", async () => {
      const Market = await ethers.getContractFactory("Market");
      const market = await Market.deploy("", mockProb, { value: someEth });

      const payedForBet = ethers.utils.parseEther("0.1");
      const betSize = await market.getYesBetSize(payedForBet);
      expect(betSize).to.be.closeTo(
        ethers.utils.parseEther("0.3044348979"),
        1e10
      );
    });

    it("should have correct balances (contract and better) after YES bet", async () => {
      const [, better] = await ethers.getSigners();
      const Market = await ethers.getContractFactory("Market");
      const market = await Market.deploy("", mockProb, { value: someEth });
      await market.deployed();

      const payedForBet = ethers.utils.parseEther("0.1");
      const yesBetSize = await market.getYesBetSize(payedForBet);
      const expectedTotSupply = someEth.add(payedForBet);

      await expect(market.connect(better).bet(true, { value: payedForBet }))
        .to.emit(market, "BetMade")
        .withArgs(
          true,
          better.address,
          payedForBet,
          yesBetSize,
          expectedTotSupply,
          expectedTotSupply,
          expectedTotSupply.sub(yesBetSize),
          expectedTotSupply
        );
    });

    it("should have correct balances (contract and better) after NO bet", async () => {
      const [, better] = await ethers.getSigners();
      const Market = await ethers.getContractFactory("Market");
      const market = await Market.deploy("", mockProb, { value: someEth });
      await market.deployed();

      const payedForBet = ethers.utils.parseEther("0.1");
      const noBetSize = await market.getNoBetSize(payedForBet);
      const expectedTotSupply = someEth.add(payedForBet);

      await expect(market.connect(better).bet(false, { value: payedForBet }))
        .to.emit(market, "BetMade")
        .withArgs(
          false,
          better.address,
          payedForBet,
          noBetSize,
          expectedTotSupply,
          expectedTotSupply,
          expectedTotSupply,
          expectedTotSupply.sub(noBetSize)
        );
    });

    it("should have correct balances (contract and better) after 2 NO bet", async () => {
      const [, better] = await ethers.getSigners();
      const Market = await ethers.getContractFactory("Market");
      const market = await Market.deploy("", mockProb, { value: someEth });
      await market.deployed();

      const payedForBet = ethers.utils.parseEther("0.1");
      const firstNoBetSize = await market.getNoBetSize(payedForBet);
      await market.connect(better).bet(false, { value: payedForBet });

      const noBetSize = await market.getNoBetSize(payedForBet);
      const expectedTotSupply = someEth.add(payedForBet).add(payedForBet);

      const ammYes = expectedTotSupply;
      const ammNo = expectedTotSupply.sub(noBetSize).sub(firstNoBetSize);

      await expect(market.connect(better).bet(false, { value: payedForBet }))
        .to.emit(market, "BetMade")
        .withArgs(
          false,
          better.address,
          payedForBet,
          noBetSize,
          expectedTotSupply,
          expectedTotSupply,
          ammYes,
          ammNo
        );

      const ammYesF = Number(ethers.utils.formatEther(ammYes));
      const ammNoF = Number(ethers.utils.formatEther(ammNo));
      const a = 0.3;
      const expectedImpliedProb =
        (a * ammNoF) / (a * ammNoF + (1 - a) * ammYesF);
      const actualImpliedProb = await market.impliedProbability();
      expect(Number(ethers.utils.formatEther(actualImpliedProb))).to.be.closeTo(
        expectedImpliedProb,
        1e-16
      );
    });
  });

  describe("resolution", () => {
    const YesEnum = 0;
    const NoEnum = 1;
    const NaEnum = 2;

    it("should set resolved to true once resolved", async () => {
      const Market = await ethers.getContractFactory("Market");
      const market = await Market.deploy(mockName, mockProb, {
        value: someEth,
      });
      await market.deployed();

      expect(await market.resolved()).to.equal(false);
      await market.resolve(YesEnum);
      expect(await market.resolved()).to.equal(true);
      expect(await market.resolvedOutcome()).to.equal(YesEnum);
    });

    it("should not be able to call market solution twice", async () => {
      const Market = await ethers.getContractFactory("Market");
      const market = await Market.deploy(mockName, mockProb, {
        value: someEth,
      });
      await market.deployed();

      await market.resolve(NaEnum);
      expect(await market.resolvedOutcome()).to.equal(NaEnum);

      await expect(market.bet(true)).to.be.revertedWith(
        "Market cannot be betted on once resolved"
      );
    });

    it("should not be able to bet after market resolution", async () => {
      const Market = await ethers.getContractFactory("Market");
      const market = await Market.deploy(mockName, mockProb, {
        value: someEth,
      });
      await market.deployed();

      await market.resolve(NoEnum);
      expect(await market.resolvedOutcome()).to.equal(NoEnum);

      await expect(market.resolve(NoEnum)).to.be.revertedWith(
        "Market can only be resolved once"
      );
    });

    it("should not be able to claim reward on unresolved market", async () => {
      const Market = await ethers.getContractFactory("Market");
      const market = await Market.deploy(mockName, mockProb, {
        value: someEth,
      });
      await market.deployed();

      await expect(market.claimReward()).to.be.revertedWith(
        "Market is not resolved yet"
      );
    });
  });
});
