// Loading in needed modules
const path = require('path');
const fs = require('fs');
const solc = require('solc');

// Creating a variable to set the file path to the
// inbox directory from the home directory.
// Then telling it to go to the 'contracts' folder then
// read the inbox solidity file.
const inboxPath = path.resolve(__dirname, 'contracts', 'inbox.sol');
// Creating a variable to read the contents of a file.
const source = fs.readFileSync(inboxPath, 'utf8');

// Export the 'inbox' contents of the solidity compiler output
module.exports = solc.compile(source, 1).contracts[':Inbox'];
// console.log(solc.compile(source, 1))