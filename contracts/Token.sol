pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @custom:security-contact valentin@invisoo.com
contract PredictionToken is ERC20, Ownable {
  constructor(
    string memory name_,
    string memory symbol_,
    uint initFund
  ) ERC20(name_, symbol_) {
    _mint(msg.sender, initFund);
  }

  function mint(address to, uint amount) external onlyOwner {
    _mint(to, amount);
  }

  function mintToOwner(uint amount) external onlyOwner {
    _mint(owner(), amount);
  }

  function burn(address account, uint amount) external onlyOwner {
    _burn(account, amount);
  }
}

contract YesToken is PredictionToken {
  constructor(uint initFund) PredictionToken("Yes", "YES", initFund) {}
}

contract NoToken is PredictionToken {
  constructor(uint initFund) PredictionToken("No", "NO", initFund) {}
}

contract NaToken is PredictionToken {
  constructor(uint initFund) PredictionToken("N/A", "NA", initFund) {}
}
