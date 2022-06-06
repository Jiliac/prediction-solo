pragma solidity ^0.8.0;

import "@prb/math/contracts/PRBMathUD60x18.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";
import "./Token.sol";

/// @custom:security-contact valentin@invisoo.com
contract Market is Ownable {
  using PRBMathUD60x18 for uint256;

  uint public constant maxProb = 1e18;

  string public name;

  // AMM variables:
  uint public initProbability;
  uint public ammConstant;

  // Bet Management
  YesToken public yesToken;
  NoToken public noToken;

  // Resolving
  bool public resolved; // Cannot change the resolved status once set
  enum Resolution{YES, NO, NA}
  Resolution public resolvedOutcome;

  constructor(string memory _name, uint probability) payable {
    uint initFund = msg.value;
    require(probability > 0, "Need a strictly positive initial probability");
    require(probability < maxProb, "Probability between 0 and 1 strictly. 18 decimals.");
    require(initFund > 1e18, "Need enough liquidity to be initialized");

    name = _name;
    initProbability = probability;

    yesToken = new YesToken(initFund);
    noToken = new NoToken(initFund);

    setAMMConstant();

    resolved = false;
  }

  event BetMade(
      bool outcome,
      address better,
      uint amount,
      uint betSize,
      uint yesTot,
      uint noTot,
      uint ammYes,
      uint ammNo
      );

  // Outcome: true means the better wants to bet on YES.
  // If outcome is false, the better wants to bet on NO.
  function bet(bool outcome) external payable {
    require(resolved == false, "Market cannot be betted on once resolved");

    address better = msg.sender;
    uint amount = msg.value;
    require(amount > 0, "Bet cannot be null");

    uint betSize = outcome ? getYesBetSize(amount) : getNoBetSize(amount);

    yesToken.mintToOwner(amount);
    noToken.mintToOwner(amount);

    if (outcome) {
      yesToken.transfer(better, betSize);
    } else {
      noToken.transfer(better, betSize);
    }

    emit BetMade(
        outcome,
        better,
        amount,
        betSize,
        yesToken.totalSupply(),
        noToken.totalSupply(),
        yesToken.balanceOf(address(this)),
        noToken.balanceOf(address(this))
        );
  }

  function resolve(Resolution outcome) external onlyOwner {
    require(resolved == false, "Market can only be resolved once");
    require(yesToken.totalSupply() == noToken.totalSupply(), "Incoherent market");
    resolved = true;
    resolvedOutcome = outcome;

    // @WARNING: Setting the owner funds based on the AMM constant is a hack.
    // Works because no one else is providing liquidity. Once liquidity
    // provider will be allowed, this won't work.
    uint ownerFunds = ammConstant;
    payable(owner()).transfer(ownerFunds);

    // @TODO: emit event. Why?
  }

  function claimReward() external {
    require(resolved == true, "Market is not resolved yet");
    // 1. Get the amount resolved
    // 2. require the amount to be above zero
    // 3. burn the token. (Or transfer back to Market?)
    // 4. send funds back.
  }

  // *******************
  // **** Internals ****

  function setAMMConstant() internal {
    uint a = initProbability;
    uint yesTot = yesToken.totalSupply();
    uint noTot = noToken.totalSupply();

    uint left = yesTot.pow(a);
    uint right = noTot.pow(maxProb - a);
    ammConstant = right.mul(left);
  }

  // *******************************
  // **** Views for Bet Marking ****

  function getYesBetSize(uint amount) public view returns (uint betSize) {
    uint a = initProbability;
    uint k = ammConstant;
    uint yesTot = yesToken.balanceOf(address(this)) + amount;
    uint noTot = noToken.balanceOf(address(this)) + amount;

    uint aInv = a.inv();
    uint numerator = k.pow(aInv);
    uint denominator = noTot.pow(maxProb - a).pow(aInv);
    uint toSub = numerator.div(denominator);
    betSize = yesTot - toSub;
  }

  function getNoBetSize(uint amount) public view returns (uint betSize) {
    uint a = initProbability;
    uint k = ammConstant;
    uint yesTot = yesToken.balanceOf(address(this)) + amount;
    uint noTot = noToken.balanceOf(address(this)) + amount;

    uint aInv = (maxProb - a).inv();
    uint numerator = k.pow(aInv);
    uint denominator = yesTot.pow(a).pow(aInv);
    uint toSub = numerator.div(denominator);
    betSize = noTot - toSub;
  }

  // ***************
  // **** Views ****

  function impliedProbability() public view returns(uint) {
    uint a = initProbability;
    uint yesTot = yesToken.balanceOf(address(this));
    uint noTot = noToken.balanceOf(address(this));

    uint numerator = a.mul(noTot);
    uint denominator = numerator + yesTot.mul(maxProb - a);
    return numerator.div(denominator);
  }

  function tokenBalanceOf(address addr) public view returns (uint yes, uint no) {
    yes = yesToken.balanceOf(addr);
    no = noToken.balanceOf(addr);
  }

  function totalSupply() external view returns(uint yesTot, uint noTot) {
    yesTot = yesToken.totalSupply();
    noTot = noToken.totalSupply();
  }
}
