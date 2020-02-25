const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
// Added line 6 and updated line 7 because of supposed versioning issue
// pointed out in Udemy course.
const provider = ganache.provider()
const web3 = new Web3(provider);
const { interface, bytecode } = require('../compile');

// Create global variables to then
// assign values in the subsequent functions.
let accounts;
let inbox;

// Run this block before each of the following
// describe functions.
beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();

    // Use one of those accounts to deploy
    // the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
        data: bytecode,
        arguments: ['Hi there!']
    })
    .send({ from: accounts[0], gas: '1000000' });

    // Added because of supposed versioning issue
    // pointed out in Udemy course.
    inbox.setProvider(provider);
});

describe('inbox', () => {
    it('deploys a contract', () => {
        // Verifies that the 'address' property
        // on the inbox.options is a value
        // that exists. If null/undefined, test
        // will fail.
        assert.ok(inbox.options.address);
    });

    it('has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Hi there!');
    });

    it('can change the message', async () => {
        await inbox.methods.setMessage('bye').send({ from: accounts[0] });
        const message = await inbox.methods.message().call();
        assert.equal(message, 'bye');
    });
});