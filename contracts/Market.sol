pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";
import "./Token.sol";

/// @custom:security-contact valentin@invisoo.com
contract Market is Ownable {
  string public name;

  uint public constant maxProb = 10000;
  uint public initProbability;

  YesToken public yesToken;
  NoToken public noToken;

  constructor(string memory _name, uint probability) payable {
    name = _name;

    require(probability > 0, "Need a strictly positive initial probability");
    require(probability < maxProb, "Probability range from 0 to 10000");
    initProbability = probability;

    require(msg.value > 0, "Need liquidity to be initialized");
    uint initFund = msg.value;
    mint(initFund);
  }

  // Outcome: true means the better wants to bet on YES.
  // If outcome is false, the better wants to bet on NO.
  function bet(bool outcome) payable {
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

  function mint(uint256 fund) internal {
    yesToken = new YesToken(fund);
    noToken = new NoToken(fund);
  }

  function burnAll() internal {
    yesToken.burnAll();
    noToken.burnAll();
  }

  // ************************
  // **** Views for test ****

  function totalSupply() external view returns(uint256 yesTot, uint256 noTot) {
    yesTot = yesToken.totalSupply();
    noTot = noToken.totalSupply();
  }
}
