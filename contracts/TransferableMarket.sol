pragma solidity ^0.8.4;

import "./Market.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TransferableMarket is Market {
  // Allow ownership transfer during initialization.
  bool initializing;

  constructor(
      string memory _name,
      uint probability,
      address owner
  ) payable Market(_name, probability) {
    initializing = true;
    if (owner != address(0) && owner != msg.sender) {
      console.log("owner", owner);
      transferOwnership(owner);
    }
    initializing = false;  
  }

  function transferOwnership(address newOwner) public virtual override onlyOwner {
    require(initializing, "disabled");
    Ownable.transferOwnership(newOwner);
  }
}
