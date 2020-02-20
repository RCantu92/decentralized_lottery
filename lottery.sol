pragma solidity ^0.4.17;

contract Lottery {
    
    address public manager;
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
}