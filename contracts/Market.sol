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

  YesToken public yesToken;
  NoToken public noToken;

  constructor(string memory _name, uint probability) payable {
    name = _name;

    require(probability > 0, "Need a strictly positive initial probability");
    require(probability < maxProb, "Probability range from 0 to 10000");
    initProbability = probability;

    require(msg.value > 0, "Need liquidity to be initialized");
    uint initFund = msg.value;
    yesToken = new YesToken(initFund);
    noToken = new NoToken(initFund);

    setAMMConstant();
  }

  // Outcome: true means the better wants to bet on YES.
  // If outcome is false, the better wants to bet on NO.
  function bet(bool outcome) public payable {
    address better = msg.sender;
    uint amount = msg.value;
    require(amount > 0, "Bet cannot be null");

    // @TODO: compute pre-minting constant
    mint(amount);
    // @TODO: resolve on how much token to transfer to the better.

    // @TODO: Emit something?
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

  function mint(uint fund) internal {
    address contractAddr = address(this);
    yesToken.mint(contractAddr, fund);
    noToken.mint(contractAddr, fund);
  }

  function burnAll() internal {
    yesToken.burnAll();
    noToken.burnAll();
  }

  // ***************
  // **** Views ****

  function impliedProbability() public view returns(uint) {
    // @TODO: n / (y + n)
  }

  function totalSupply() external view returns(uint yesTot, uint noTot) {
    yesTot = yesToken.totalSupply();
    noTot = noToken.totalSupply();
  }
}
