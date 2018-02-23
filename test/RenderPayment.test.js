import assertRevert from 'zeppelin-solidity/test/helpers/assertRevert';

const RenderPayment = artifacts.require('RenderPayment');

contract('RenderPayment', function (accounts) {
  const initialBalance = 1000 * 10**18;

  beforeEach(async function () {
    this.token = await RenderPayment.new(initialBalance);
  });

  it('sets initial balance for creator from constructor', async function () {
    const balance = await this.token.balanceOf(accounts[0]);
    assert.equal(1000, web3.fromWei(balance, 'ether').toNumber());
  });

  it('sets totalSupply to initialBalance', async function () {
    const totalSupply = await this.token.totalSupply();
    assert.equal(1000, web3.fromWei(totalSupply, 'ether').toNumber());
  });

  it('allows creator to redistribute tokens', async function () {
    await this.token.transfer(accounts[1], web3.toWei(400, 'ether'));
    await this.token.transfer(accounts[2], web3.toWei(600, 'ether'));
    const balance0 = await this.token.balanceOf(accounts[0]);
    const balance1 = await this.token.balanceOf(accounts[1]);
    const balance2 = await this.token.balanceOf(accounts[2]);
    assert.equal(0, web3.fromWei(balance0, "ether").toNumber());
    assert.equal(400, web3.fromWei(balance1, "ether").toNumber());
    assert.equal(600, web3.fromWei(balance2, "ether").toNumber());
  });
});
