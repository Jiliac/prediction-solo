pragma solidity ^0.8.14;

import "./TransferableMarket.sol";

contract MarketFactory {
  event NewMarket(
    address contractAddr,
    address ownerAddr,
    uint probability,
    uint amount
  ); 

  function createMarket(string calldata name, uint probability) external payable {
    address owner = msg.sender;
    TransferableMarket market =
      new TransferableMarket{value: msg.value}(name, probability, owner);

    emit NewMarket(address(market), owner, probability, msg.value);
  }

  function createMarketAndSend(
    string memory name,
    uint probability,
    address owner
  ) external payable {
    TransferableMarket market =
      new TransferableMarket{value: msg.value}(name, probability, owner);
    emit NewMarket(address(market), owner, probability, msg.value);
  }

  function isDeployed() pure external returns(bool) { return true; } 
}
