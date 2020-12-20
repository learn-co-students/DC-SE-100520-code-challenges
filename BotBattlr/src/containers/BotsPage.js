import React, { Component } from "react";
import BotCollection from './BotCollection'
import YourBotArmy from './YourBotArmy'

class BotsPage extends Component {
  //start here with your code for step one

    state = {
      bots: [],
      army: []
    }
  

  componentDidMount = () => {
    const URL = 'http://localhost:6001/bots'
    fetch(URL)
    .then(resp => resp.json())
    .then(bots => this.setState({bots}))
  }

  addBot = (bot) =>{
    if(!this.state.army.includes(bot)){
      //if this.state.army does not include this bot then run below
     this.setState({army: [...this.state.army, bot]}
      //army value is including this new bot value
      )}}
    

  removeBot = (bot) => {
    let newArmy = this.state.army.filter(
      armyBot => armyBot !== bot
      )
    this.setState({army: newArmy})
   }

  botDischarge = (botId) => {
    const currentBots = this.state.bots;

    this.setState({
      bots: currentBots.filter(bot => botId !== bot.id)
    })

    fetch('http://localhost:6001/bots/' + botId, {
      method: 'DELETE',
      headers: {'Accept': 'applicaiton/json',
      'Content-Type': 'application/json'

    } 

    }).then(response => {
      if (response.status === 'error'){
        this.setState({
          bots: currentBots
        });
      }else {
        return 'Bot Discharged'
      }
    })

    }
  



  

  render() {

    return <div>
      
    <YourBotArmy 
    botData={this.state.army}
    removeBot={this.removeBot}
    botDischarge={this.botDischarge}
    />
    < BotCollection  
      botData={this.state.bots}
      addBot={this.addBot}
      botDischarge={this.botDischarge}


      />
    </div>;
  }
}

export default BotsPage;
