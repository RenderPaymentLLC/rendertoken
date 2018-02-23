var fs = require("fs");
var RenderPayment = artifacts.require("RenderPayment");

module.exports = async function(deployer, network, accounts) {
  if (network == "ropsten" || network == "mainnet") {
    const initialBalances = JSON.parse(
      fs.readFileSync("migrations/initial_balances.json")
    );

    var token = RenderPayment.at(RenderPayment.address);

    for (var account in initialBalances) {
      const currentBalance = await token.balanceOf(account);
      if (currentBalance < initialBalances[account]) {
        const transferAmount = initialBalances[account] - currentBalance;
        console.log('Transferring ' + transferAmount + ' to ' + account);
        await token.transfer(account, transferAmount);
      }
    }
  }
};
