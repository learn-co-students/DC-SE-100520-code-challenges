import React, { Component } from "react";
import YourBotArmy from "./YourBotArmy";
import BotCollection from "./BotCollection";

class BotsPage extends Component {
  //start here with your code for step one

  state = {
    bots: [],
    botArmy: [],
  };

  componentDidMount() {
    let url = "http://localhost:6001/bots";
    fetch(url)
      .then((response) => response.json())
      .then((botsArray) => this.setState({ bots: botsArray }));
  }

  army = (bot) => {
    !this.state.botArmy.includes(bot) ? this.setState({
      botArmy: [...this.state.botArmy, bot]
    }) : null
  };

  removeBot = (bot) => {
    let newArmy = this.state.botArmy.filter(robot => robot != bot)

    this.setState({
      botArmy: newArmy
    })
  }

  render() {
    return (
      <div>
        <BotCollection 
        bots={this.state.bots} 
        addBot={this.army}
        /> 
        <YourBotArmy removeBot={this.removeBot} army={this.state.botArmy}/>
      </div>
    );
  }
}

export default BotsPage;
