import React, { Component } from "react";
import BotCollection from './BotCollection'
import YourBotArmy from './YourBotArmy'
// my backend
const botsURL = 'http://localhost:6001/bots'

class BotsPage extends Component {
// initializing state
  state = {
    bots: [],
    myArmy: []
  }
  // fetch call made to grab all the bots from the backend
  componentDidMount(){
    fetch(botsURL)
      .then(res => res.json())
      .then(botsArr => this.setState({
        bots: botsArr
      })
    )
  }
  // function used to add a bot to my army
  addBot = (bot) => {
    if(!this.state.myArmy.includes(bot)){
      this.setState({
        myArmy: [...this.state.myArmy, bot]
      })
    }
  }
  // function to remove a bot from my army on the frontend
  removeBot = (bot) => {
    let takenBot = this.state.myArmy.filter(theBot => theBot !== bot)
    this.setState({
      myArmy: takenBot
    })
  }
// function used to remove a bot from the backend and also remove from my army if it is in the army
  retireBot = (bot) => {
    let retiredBot = this.state.myArmy.filter(theBot => theBot !== bot)
    let deletedBot = this.state.bots.filter(theBot => theBot !== bot )
    fetch(`${botsURL}/${bot.id}`, {method: 'DELETE'})
      .then(res => res.json())
      .then(dBot => this.setState({
        myArmy: retiredBot,
        bots: deletedBot
      }))
  }
  // function used to filter bots

  render() {
    return <div>
    {/* passing state and function properties to the containers  */}
      <YourBotArmy
        bots={this.state.myArmy} 
        addBot={this.addBot} 
        removeBot={this.removeBot}
        deleteBot={this.retireBot} />
      <BotCollection 
        addBot={this.addBot} 
        bots={this.state.bots} 
        deleteBot={this.retireBot} />
      
    </div>;
  }
}

export default BotsPage;

