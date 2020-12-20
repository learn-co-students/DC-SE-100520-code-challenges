import React, { Component } from "react";
import BotCollection from "./BotCollection";
import YourBotArmy from "./YourBotArmy";
import BotSpecs from "../components/BotSpecs";

const URL = "http://localhost:6001/bots/";

class BotsPage extends Component {
  constructor() {
    // initalizes state
    super();
    this.state = {
      bots: [],
      army: [],
      specsPage: false,
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
    let oldBot = this.state.bots.filter(oldBot => oldBot.id !== bot.id)
    if (!this.state.army.includes(bot)) {
      this.setState({
        army: [...this.state.army, bot],
        bots: oldBot

      });

      this.goBack()
    }
  };

  removeBots = (bot) => {
    //if bot is clicked, remove bot from bot Army
    let removeBot = this.state.army.filter((armyBot) => armyBot.id !== bot.id);
    this.setState({
      army: removeBot,
      bots: [bot, ...this.state.bots]
    });
  };

  deleteBots = (bot) => {
    fetch(URL + bot.id, {
      method: "DELETE",
    }).then((resp) => resp.json());
    console.log("delete");
    let deleteBot = this.state.bots.filter((deadBot) => deadBot.id !== bot.id);
    this.setState({
      bots: deleteBot,
    });
    this.removeBots(bot);
  };
  handleSpecPage = (bot) => {
    this.setState({
      specsPage: bot,
    });
  };

  goBack = () => {
    this.setState({
      specsPage: false,
    });
  };

  render() {
    return (
      <div>
        <YourBotArmy
          army={this.state.army}
          removeBot={this.removeBots}
          deleteBots={this.deleteBots}
        />
        {
          this.state.specsPage === false ? 
          <BotCollection
            bots={this.state.bots}
            addBots={this.handleSpecPage}
            deleteBots={this.deleteBots}
          />
          :
         <BotSpecs goBack={this.goBack} 
         bot={this.state.specsPage} 
         addBots={this.addBotsToArmy}/>
        }
      </div>
    );
  }
}

export default BotsPage;
