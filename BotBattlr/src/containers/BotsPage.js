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


   deleteBotForever = (e, bot) => {
     console.log(bot)
    // console.log('delete me forever and ever')
    // console.log(id)
  //   e.preventDefault()
  // const response = fetch(API), {
  //   method: "DELETE",
  // });
  // return response.json();

  //need to still figure out logic for deleting the bot from front end/back end, think I need to target the bot id
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
