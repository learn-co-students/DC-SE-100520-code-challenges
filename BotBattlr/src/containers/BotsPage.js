import React, { Component } from "react";
import BotCollection from "./BotCollection";
import YourBotArmy from "./YourBotArmy";

const url = 'http://localhost:6001/bots'
class BotsPage extends Component {
  
  state = {
    bots: []
  }


  async componentDidMount() {
    const response = await fetch(url)
    const bots = await response.json()
    this.setState({ bots })
  }

  render() {
    return <div>
      <YourBotArmy />
      <BotCollection allBots={this.state.bots}/>
    </div>;
  }
}

export default BotsPage;
