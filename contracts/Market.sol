pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Market {
  address public owner;
  string public name;

  uint public constant maxProb = 10000;
  uint public initProbability;

  constructor(string memory _name, uint probability) payable {
    owner = msg.sender;
    name = _name;

    require(probability > 0, "Need a strictly positive initial probability");
    require(probability < maxProb, "Probability range from 0 to 10000");
    initProbability = probability;

    require(msg.value > 0, "Need liquidity to be initialized");
  }
}
