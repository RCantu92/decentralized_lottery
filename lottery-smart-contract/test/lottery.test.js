// Load in assert module
const assert = require('assert');
// Load in Ganache CLI
const ganache = require('ganache-cli');
// Load in web3
const Web3 = require('web3');
// Create an instance of web3 that connects
// to the ganache local blockchain 
// and saves it to a variable.
const web3 = new Web3(ganache.provider());
// Import interface and bytecode from compile.js
const { interface, bytecode } = require('../compile');

// Declaring two variables with no values.
let lottery;
let accounts;

/**
 * @dev Getting the accounts and deploying our
 * contract at the beginning of every test.
 */
beforeEach(async () => {
    // Get a list of generated accounts and
    // save to previously declared variable.
    accounts = await web3.eth.getAccounts();

    /**
     * @dev Saving the instance of the deployed contract.
     * @param interface ABI from compiled contract.
     * Used JSON.parse because Contract() requires JavaScript object.
     * @param data contract's bytecode.
     * @param gas fee paid to the network to run code. Counted in wei.
     * @param from account from which gas is being paid from.
     */
    lottery = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode })
        .send({ from: accounts[0], gas: '1000000' });
});

describe('Lottery Contract', () => {
    // Verifies our contract was deployed.
    it('deploys a contract', () => {
        assert.ok(lottery.options.address);
    });

    // Verifies that the players address was
    // successfully entered into the lottery.
    it('allows one account to enter', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02', 'ether')
        });
        
        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });

        assert.equal(accounts[0], players[0]);
        assert.equal(1, players.length);
    });

    // Verifies the contract allows multiples players
    // to enter the lottery.
    it('allows multiple accounts to enter', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02', 'ether')
        });
        await lottery.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei('0.02', 'ether')
        });
        await lottery.methods.enter().send({
            from: accounts[2],
            value: web3.utils.toWei('0.02', 'ether')
        });
        
        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });

        assert.equal(accounts[0], players[0]);
        assert.equal(accounts[1], players[1]);
        assert.equal(accounts[2], players[2]);
        assert.equal(3, players.length);
    });
});