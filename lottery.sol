pragma solidity ^0.4.17;

contract Lottery {
    
    // Address of person who creaed the
    // contract
    address public manager;
    // Array of addresses of people who
    // have entered.
    address[] public players;
    
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
    // This function can also be called byt
    // the manager address.
    function pickWinner() public {
        require(msg.sender == manager);
        uint index = random() % players.length;
        players[index].transfer(this.balance);
        players = new address[](0);
    }
}