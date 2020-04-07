// Load in the path module
const path = require('path');
// Load in the filesystem module
const fs = require('fs');
// Load in the solidity compiler module
const solc = require('solc');

/**
 * @dev Creating a variable to store the file path to the
 * 'Lottery' contract directory from the home directory.
 * Then telling it to go to the 'contracts' folder then
 * read 'lottery.sol'.
 * @param __dirname node defined constant set to current working
 * directory.
 * @param 'contracts' is the 'to' directory
 * @param 'lottery.sol' is the 'to' file
 */
const lotteryPath = path.resolve(__dirname, 'contracts', 'lottery.sol');

/**
 * @dev Creating a variable to store the contents of a file.
 * @param lotteryPath variable storing the file path to desired file.
 * @param 'utf8' the encoding.
 */
const source = fs.readFileSync(lotteryPath, 'utf8');

/**
 * @dev Export the 'lottery' contents of the solidity compiler output.
 * @param source variable storing the desired file contents.
 * @param '1' number of contracts attempting to compile.
 */
module.exports = solc.compile(source, 1).contracts[':Lottery'];