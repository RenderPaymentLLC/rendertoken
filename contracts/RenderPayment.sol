pragma solidity 0.4.19;

import "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";

contract RenderPayment is StandardToken {
  string public constant name = "Render Payment";
  string public constant symbol = "RPM";
  uint8 public constant decimals = 18;

  function RenderPayment(uint256 _initialBalance) public {
    balances[msg.sender] = _initialBalance;
    totalSupply_ = _initialBalance;
  }
}
