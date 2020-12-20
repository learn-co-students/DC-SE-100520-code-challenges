import React, { Component } from "react";
import BotCollection from "./BotCollection";
import YourBotArmy from './YourBotArmy'
class BotsPage extends Component {
  //start here with your code for step one
  state = {
    bots: [],
    army: []
  }
  componentDidMount(){
    const URL = "http://localhost:6001/bots"
    fetch(URL)
    .then(res => res.json())
    .then(bots => this.setState({bots}))
  }

  recruitArmy = (bot) => {
    if(!this.state.army.includes(bot)){
      this.setState({army: [...this.state.army, bot]})
    }
  }

  deleteRecruit = (bot) => {
    let freshArmy = this.state.army.filter(
      newArmy => newArmy !== bot
    )

    this.setState({army: freshArmy })
  }

  destroyBot = (bot) => {

    //if bot is clicked in bot collection, destroy all instances of bot
    let allBots = this.state.bots.filter(
      newBots => newBots !== bot
    )
    this.setState({bots: allBots})
  }

  render() {
    return (
      <div>
          <div>
            <YourBotArmy botData={this.state.army} deleteRecruit={this.deleteRecruit} destroyBot={this.destroyBot} /> 
          </div>
          <div>
            <BotCollection botData={this.state.bots} recruitArmy={this.recruitArmy} destroyBot={this.destroyBot} />
          </div>
        </div>
    );
  }
}

export default BotsPage;
