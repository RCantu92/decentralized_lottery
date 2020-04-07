# Decentralized Lottery

This project aims to provide a lottery smart contract that accepts Ether into its pot. The manager would then call the function that would randomly select a winner to whom the pot of Ether would be awarded to.

## Getting Started

The following image demonstrates the process of submitting funds to the contract, through a local react app.

![](./images/decentralized_lottery_pre-funds.png)

After submitting funds, the page looks like the following.

![](./images/decentralized_lottery_accepted_funds.png)

This is the page refreshed to reflect the change in pot balance.

![](./images/decentralized_lottery_accepted_funds_II.png)

Once the pot has been awarded, the page looks like the following.

![](./images/decentralized_lottery_awarded_funds.png)

## Deployment

This contract is deployed on the rinkeby testnet under address [0x40102DAa67EE7c1748F01FB22578d778a0E55f25](https://rinkeby.etherscan.io/address/0x40102daa67ee7c1748f01fb22578d778a0e55f25).

## Built With

* [Solidity, v.4.17.0](https://solidity.readthedocs.io/en/v0.4.17/) - Smart Contract programming language used.
* [Create React App](https://github.com/facebook/create-react-app) - Tool to build React apps.

## Authors

* **Roberto Cantu**  - [GitHub](https://github.com/RCantu92)