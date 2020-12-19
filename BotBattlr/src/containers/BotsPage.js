import React, { Component } from "react";
import BotCollection from "./BotCollection";
import YourBotArmy from "./YourBotArmy";

const url = 'http://localhost:6001/bots/'
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
      //filter creates a new array that will not include the bot I clicked (removed)
      // if bots = [1, 2, 3, 4, 5] and I click 3...
      // newbots = [1, 2, 4, 5]
      //clicked bot === removed bot
      //I need to filter OUT any bot that MATCHES the one I clicked
      //bot in array is KEPT if bot !== armyBot
    })
  }

  discharge = (id) => {
    console.log('discharge connection is good')
    console.log(url + id)
    //delete from backend
    return fetch(url + id, {method: 'DELETE'})
    .then(resp => resp.json())
    // when I clg resp.json, promise shows
    .then(newBots => {
    //newBots comes back as an empty obj
        this.setState({
        armyBots: this.state.armyBots.filter(bot => bot.id !== id)
      })
    })
  }
  //for the deliverable, this DOES delete from the backend
  //this DOES delete from YBA when you click it in the bot army, and deletes
  //DOES delete bot.id from YBA if clicked in BC...
  //because while it does briefly add to YBA...
  //it deletes from backend, and immediately removes, like deliverables ask for



  render() {
    return <div>
      <YourBotArmy
        allBots={this.state.bots}
        myBots={this.state.armyBots}
        remove={this.remove}
        discharge={this.discharge}
      />

      <BotCollection
        allBots={this.state.bots}
        addToArmy={this.addToArmy}
        discharge={this.discharge}
      />
    </div>;
  }
}

export default BotsPage;
