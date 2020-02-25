// Loading in needed modules
const path = require('path');
const fs = require('fs');
const solc = require('solc');

// Creating a variable to set the file path to the
// lottery directory from the home directory.
// Then telling it to go to the 'contracts' folder then
// read the lottery solidity file.
const lotteryPath = path.resolve(__dirname, 'contracts', 'lottery.sol');
// Creating a variable to read the contents of a file.
const source = fs.readFileSync(lotteryPath, 'utf8');

// Export the 'lottery' contents of the solidity compiler output
module.exports = solc.compile(source, 1).contracts[':Lottery'];
// console.log(solc.compile(source, 1))