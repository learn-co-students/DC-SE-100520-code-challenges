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

  deleteRobot = (bot) => {
    let url = "http://localhost:6001/bots";
    fetch(`${url}/${bot.id}`, {
      method: 'DELETE',
      headers: {"Content-type": "application/json"},
      body: JSON.stringify(bot)
    })
    .then(response => response.json())

    this.componentDidMount()
    //to fresh page
    let newArmy = this.state.botArmy.filter(robot => robot != bot)

    this.setState({
      botArmy: newArmy
    })
  }

  render() {
    return (
      <div>
        <YourBotArmy deleteRobot={this.deleteRobot} removeBot={this.removeBot} army={this.state.botArmy}/>
        
        <BotCollection 
        bots={this.state.bots} 
        addBot={this.army}
        // deleteRobot={this.deleteRobot}
        /> 
      </div>
    );
  }
}

export default BotsPage;
