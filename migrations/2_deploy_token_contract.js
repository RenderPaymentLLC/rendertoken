var fs = require("fs");
var RenderPayment = artifacts.require("RenderPayment");

module.exports = async function(deployer, network, accounts) {
  if (network == 'ropsten' || network == 'mainnet') {
    const totalSupply = 1000000010 * 10**18;
    await deployer.deploy(RenderPayment, totalSupply);
  }
};
