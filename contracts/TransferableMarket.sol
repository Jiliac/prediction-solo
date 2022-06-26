pragma solidity ^0.8.4;

import "./Market.sol";

contract TransferableMarket is Market {
  // Allow ownership transfer during initialization.
  bool initializing;

  constructor( uint probability, address owner) payable Market(probability) {
    initializing = true;
    if (owner != address(0) && owner != msg.sender) {
      transferOwnership(owner);
    }
    initializing = false;  
  }

  function transferOwnership(address newOwner) public virtual override onlyOwner {
    require(initializing, "disabled");
    Ownable.transferOwnership(newOwner);
  }
}
