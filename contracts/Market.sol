pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";
import "./Token.sol";

/// @custom:security-contact valentin@invisoo.com
contract Market is Ownable {
  string public name;

  uint public constant maxProb = 10000;
  uint public initProbability;

  YesToken yesToken;
  NoToken noToken;

  constructor(string memory _name, uint probability) payable {
    name = _name;

    require(probability > 0, "Need a strictly positive initial probability");
    require(probability < maxProb, "Probability range from 0 to 10000");
    initProbability = probability;

    require(msg.value > 0, "Need liquidity to be initialized");
    uint initFund = msg.value;
    yesToken = new YesToken(initFund);
    noToken = new NoToken(initFund);
  }
}
