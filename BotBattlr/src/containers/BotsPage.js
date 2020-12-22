import React, { Component } from "react";
import BotCollection from './BotCollection'
import YourBotArmy from './YourBotArmy'

const API = "http://localhost:6001/bots";
//const botId = bot.id;

class BotsPage extends Component {
  //start here with your code for step one

  state = {
    bots: [],
    yourBotArmy: [],
  };

  async componentDidMount() {
    const response = await fetch(API);
    const botData = await response.json();
    this.setState({ bots: botData });
  }

  addToBotArmy= (bot) => {
    //console.log(bot)
    if (!this.state.yourBotArmy.includes(bot)) {
      this.setState({
        yourBotArmy: [...this.state.yourBotArmy, bot],
      });
    }
  };

  removeBotFromArmy = (bot) => {
    let newBotArmy = this.state.yourBotArmy.filter(
      (armyBot) => armyBot !== bot
    )
    this.setState({ yourBotArmy: newBotArmy});

  }


   deleteBotForever = (bot) => {
    // console.log(bot.id)
   const botId = bot.id

  fetch(API + '/' + botId, {
  method: "DELETE",
});
let newBotCollection = this.state.bots.filter( allBots => allBots.id !== bot.id )
  this.setState({bots: newBotCollection })

}
  

  render() {
    return (
      <div>
        <YourBotArmy
          removeBotFromArmy={this.removeBotFromArmy}
          deleteBotForever={this.deleteBotForever}
          bots={this.state.yourBotArmy}
        />
        <BotCollection
          bots={this.state.bots}
          addToBotArmy={this.addToBotArmy}
          deleteBotForever={this.deleteBotForever}
        />
      </div>
    );
  }
}

export default BotsPage;
