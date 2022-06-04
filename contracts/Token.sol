pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @custom:security-contact valentin@invisoo.com
contract PredictionToken is ERC20, Ownable {
  constructor(
    string memory name_,
    string memory symbol_,
    uint256 initFund
  ) ERC20(name_, symbol_) {
    _mint(msg.sender, initFund);
  }

  function mint(address to, uint256 amount) public onlyOwner {
    _mint(to, amount);
  }

  function mintToOwner(uint256 amount) public onlyOwner {
    _mint(msg.sender, amount);
  }
}

contract YesToken is PredictionToken {
  constructor(uint256 initFund) PredictionToken("Yes", "YES", initFund) {}
}

contract NoToken is PredictionToken {
  constructor(uint256 initFund) PredictionToken("No", "NO", initFund) {}
}
