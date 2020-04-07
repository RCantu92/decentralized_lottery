// Import the instance of web3 previously created.
import web3 from './web3.js';

// Declaring a new variable to store the
// previously deployed contract's address.
const address = '0x40102DAa67EE7c1748F01FB22578d778a0E55f25';

// Declaring a new variable to store the
// previously deployed contract's ABI.
const abi = [{"constant":true,"inputs":[],"name":"manager","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pickWinner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getPlayers","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"enter","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"players","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]

// Create a local contract instance.
// (Not actual contract existing on the blockchain.)
export default new web3.eth.Contract(abi, address);