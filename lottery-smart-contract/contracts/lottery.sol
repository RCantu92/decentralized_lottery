pragma solidity ^0.4.17;

contract Lottery {
    
    // Address of person who created the
    // contract
    address public manager;
    
    // Array of addresses of people who
    // have entered.
    address[] public players;
    
    // This modifier is added to functions
    // so that functions can only  be called
    // by the manager address.
    modifier onlyManager() {
        require(msg.sender == manager);
        _;
    }
    
    // Constructor function that will set
    // the manager variable to the address
    // that created the contract.
    function Lottery() public {
        manager = msg.sender;
    }
    
    // Function to enter the address of the
    // bidder into the 'players' array
    function enter() public payable {
        require(msg.value > .01 ether);
        
        players.push(msg.sender);
    }
    
    // Function that genrates pseudo-random uint from 
    // the current block difficulty, currenty time, and
    // addresses of players and them putting it
    // into the SHA3 algorithm.
    function random() private view returns(uint) {
        return uint(sha3(block.difficulty, now, players));
    }
    
    // Function that randomly picks a winner
    // and sends them the prize pool.
    // The function then clears out the players
    // array so that it can be reused.
    function pickWinner() public onlyManager {
        uint index = random() % players.length;
        players[index].transfer(this.balance);
        players = new address[](0);
    }
    
    function getPlayers() public view returns(address[]) {
        return players;
    }
}