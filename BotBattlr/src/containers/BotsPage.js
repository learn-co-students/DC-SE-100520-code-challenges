import React, { Component } from "react";
import BotCollection from './BotCollection'
import YourBotArmy from './YourBotArmy'

const API = "http://localhost:6001/bots";

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

  deleteBotForever(bot){
    console.log('delete me forever and ever')
  }

  //need to still figure out logic for deleting the bot from front end/back end, think I need to target the bot id


  render() {
    return (
      <div>
        {
          <BotCollection
            bots={this.state.bots}
            addToBotArmy={this.addToBotArmy}
            deleteBotForever ={this.deleteBotForever}
          />
        }
        {
          <YourBotArmy
            addToBotArmy={this.addToBotArmy}
            bots={this.state.yourBotArmy}
          />
        }
      </div>
    );
  }
}

export default BotsPage;
