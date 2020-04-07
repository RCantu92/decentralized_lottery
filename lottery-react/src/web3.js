// Load in the web3 module
import Web3 from "web3";

// Declaring a new variable instance of the web3
// provided by MetaMask.
const provider = window.ethereum;
provider.enable();

/**
 * @dev Declaring a new variable instance of web3.
 * @param provider the account used to fund .
 */
const web3 = new Web3(provider);

// Export the instance of web3 to be able
// to be used by another file.
export default web3;