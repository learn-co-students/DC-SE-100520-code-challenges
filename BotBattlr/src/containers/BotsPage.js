import React, { Component } from "react";
import BotCollection from "./BotCollection";
import YourBotArmy from "./YourBotArmy";

class BotsPage extends Component {
  constructor() {
    // initalizes state
    super();
    this.state = {
      bots: [],
      army: [],
    };
  }

  async componentDidMount() {
    // fetching
    let response = await fetch("http://localhost:6001/bots");
    let json = await response.json();
    this.setState({
      bots: json,
    });
  }

  addBotsToArmy = (bot) => {
    // we can only add bots once
    if (!this.state.army.includes(bot)) {
      this.setState({
        army: [...this.state.army, bot],
      });
    }
  };

removeBots = (bot)  => {
  //if bot is clicked, remove bot from bot Army
 let removeBot = this.state.army.filter(armyBot => 
  armyBot.id !== bot.id)
  this.setState({
    army: removeBot
  })
}

  render() {
    return (
      <div>
        <YourBotArmy army={this.state.army} removeBot={this.removeBots}/>
        <BotCollection bots={this.state.bots} addBots={this.addBotsToArmy} />
      </div>
    );
  }
}

export default BotsPage;
