import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
// Import the instance of web3 created
// from the web.js file.
import web3 from './web3.js';
// Import the local instance of the
// lottery contract.
import lottery from './lottery.js';
 
class App extends Component {
  // Initializing state variables
  state = {
    manager: '',
    players: [],
    balance: '',
    value: '',
    message: ''
  };

  /**
   * @dev Function that is called whenever the app
   * is rendered on screen.
   */
  async componentDidMount() {

    // Get the following variables from the contract.
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    // Giving previously declared state variables value.
    this.setState({ manager, players, balance });
  }

  /**
   * @dev Event handler that takes the form submission
   * as the argument.
   * @param event form submission.
   */
  onSubmit = async (event) => {
    // Preventing the form from submitting itself.
    event.preventDefault();

    // Get the accounts from the contract instance.
    const accounts = await web3.eth.getAccounts();

    // Set the state message to give user a message
    // that they are currently being entered.
    this.setState({ message: 'Waiting on transaction success...' });

    // Enter the user into the lottery.
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    });

    // Set the state message to give user a message
    // they have been entered into the lottery.
    this.setState({ message: 'You have been entered!' });
  }

  /**
   * @dev Event handler that takes the click of the
   * 'button' as the argument.
   * @param event click of the 'button'.
   */
  onClick = async (event) => {
    // Get the accounts from the contract instance.
    const accounts = await web3.eth.getAccounts();

    // Set the state message to give user a message
    // that the winner is being picked.
    this.setState({ message: 'Waiting on transaction success...' });

    // Calling the pickWinner() from the lottery contract.
    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });

    // Set the state message to give user a message
    // that the winner has been picked.
    this.setState({ message: 'A winner has been picked!' });
  }

  // The format of the rendered front end.
  render(){
  return (
    <div>
      <h2>Lottery Contract</h2>
      <p>
        This contract is managed by {this.state.manager}.
        There are currently {this.state.players.length} people entered,
        competing to win {web3.utils.fromWei(this.state.balance, 'ether')} ether!
      </p>

      <hr />

      <form onSubmit={this.onSubmit}>
        <h4>Want to try your luck?</h4>
        <div>
          <label>Amount of ether to enter</label>
          <input
            value={this.state.value}
            onChange={event => this.setState({ value: event.target.value })}
          />
        </div>
        <button>Enter</button>
      </form>

      <hr />

      <h4>Ready to pick a winner?</h4>
      <button onClick={this.onClick}>Pick a winner!</button>

      <hr />

      <h1>{this.state.message}</h1>
    </div>
  );
}}
 
// Export App class.
export default App;