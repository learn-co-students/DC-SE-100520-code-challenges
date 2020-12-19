import React, { Component } from "react";
import BotCollection from "./BotCollection";
import YourBotArmy from "./YourBotArmy";

const URL = "http://localhost:6001/bots";

class BotsPage extends Component {
  //start here with your code for step one
  state = {
    bots: [],
    // myBots: [],
  };

  async componentDidMount() {
    const response = await fetch(URL);
    const bots = await response.json();

    this.setState({ bots });
  }

  myBotArmy = (bot) => {
    // this.setState({ myBots: bot });
    // console.log(this.state.myBots);
    console.log(bot);
  };

  render() {
    return (
      <div>
        <BotCollection botsData={this.state.bots} myBotArmy={this.myBotArmy} />
        <YourBotArmy />
      </div>
    );
  }
}

export default BotsPage;
