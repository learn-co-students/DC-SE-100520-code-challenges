import React, { Component } from "react";
import BotCollection from "./BotCollection";
import YourBotArmy from "./YourBotArmy";

const URL = "http://localhost:6001/bots/";

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
    let response = await fetch(URL);
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

  removeBots = (bot) => {
    //if bot is clicked, remove bot from bot Army
    let removeBot = this.state.army.filter((armyBot) => (
      armyBot.id !== bot.id));
    this.setState({
      army: removeBot,
    });
  };

  deleteBots = (bot) => {
    fetch(URL + bot.id, {
      method: 'DELETE'
    }).then(resp => resp.json())
    console.log("delete");
    let deleteBot = this.state.bots.filter(deadBot => (
      deadBot.id !== bot.id))
    this.setState({
      bots: deleteBot
    })
    this.removeBots(bot)
  };

  render() {
    return (
      <div>
        <YourBotArmy
          army={this.state.army}
          removeBot={this.removeBots}
          deleteBots={this.deleteBots}
        />
        <BotCollection
          bots={this.state.bots}
          addBots={this.addBotsToArmy}
          deleteBots={this.deleteBots}
        />
      </div>
    );
  }
}

export default BotsPage;
