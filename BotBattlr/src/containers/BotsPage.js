import React, { Component } from "react";
import BotCollection from './BotCollection'
import YourBotArmy from './YourBotArmy'
const botsURL = 'http://localhost:6001/bots'

class BotsPage extends Component {

  state = {
    bots: [],
    myArmy: []
  }

  componentDidMount(){
    fetch(botsURL)
      .then(res => res.json())
      .then(botsArr => this.setState({
        bots: botsArr
      })
    )
  }
  addBot = (bot) => {
    if(!this.state.myArmy.includes(bot)){
      this.setState({
        myArmy: [...this.state.myArmy, bot]
      })
    }
  }

  removeBot = (bot) => {
    let takenBot = this.state.myArmy.filter(theBot => theBot !== bot)
    this.setState({
      myArmy: takenBot
    })
  }

  retireBot = (bot) => {
    let retiredBot = this.state.myArmy.filter(theBot => theBot !== bot)
    fetch(`${botsURL}/${bot.id}`, {method: 'DELETE'})
      .then(res => res.json())
      .then(dBot => this.setState({myArmy: retiredBot}))
  }
  //start here with your code for step one

  render() {
    return <div>
      <YourBotArmy
        bots={this.state.myArmy} 
        addBot={this.addBot} 
        removeBot={this.removeBot} />
      <BotCollection 
        addBot={this.addBot} 
        bots={this.state.bots} 
        deleteBot={this.retireBot} />
      
    </div>;
  }
}

export default BotsPage;

// Discharge a bot from their service forever, by clicking the red button marked "x", which would delete the bot both from the backend and from the YourBotArmy on the frontend.