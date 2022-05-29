pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Market {
  address public owner;
  string public name;

  constructor(string memory _name) {
    owner = msg.sender;
    name = _name;
  }
}
