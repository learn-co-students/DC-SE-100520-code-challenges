import React, { Component } from "react";
import BotCollection from "./BotCollection";
import YourBotArmy from "./YourBotArmy";

const url = 'http://localhost:6001/bots'
class BotsPage extends Component {
  
  state = {
    bots: [],
    armyBots: []
  }

  async componentDidMount() {
    const response = await fetch(url)
    const bots = await response.json()
    this.setState({ bots })
  }

  addToArmy = (armyBot) => {
    if(!this.state.armyBots.includes(armyBot)) {
      this.setState({
        armyBots: [...this.state.armyBots, armyBot]
      })
    }
  }

  remove = (armyBot) => {
    this.setState({
      armyBots: this.state.armyBots.filter(bot => bot !== armyBot)
    })
  }
//filter creates a new array that will not include the bot I clicked (removed)
// if bots = [1, 2, 3, 4, 5] and I click 3...
// newbots = [1, 2, 4, 5]
//filter OUT any bot that matches the one I clicked
//clicked bot === removed bot
//bot in array is kept if bot !== armyBot

  render() {
    return <div>
      <YourBotArmy
        myBots={this.state.armyBots}
        remove={this.remove}
      />

      <BotCollection
        allBots={this.state.bots}
        addToArmy={this.addToArmy}
      />
    </div>;
  }
}

export default BotsPage;
