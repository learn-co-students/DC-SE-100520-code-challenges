import React, { Component } from "react";
import BotCollection from './BotCollection';
import YourBotArmy from './YourBotArmy'

const axios = require('axios').default

class BotsPage extends Component {


  state ={
    bots: [],
    army: []
  }

  componentDidMount(){
    const URL = 'http://localhost:6001/bots/'
    fetch(URL)
      .then(response => response.json())
      .then(bots => this.setState({bots: bots}))

  }

  addToArmy = (bot) => {
    if(!this.state.army.includes(bot)){
    this.setState({ army: [...this.state.army, bot]})}
  }

  releaseFromArmy = (bot) => {
    let updatedArmy = this.state.army.filter(
      armyBot => armyBot !== bot
    )
    this.setState({army: updatedArmy})
  }

  deleteForever = (bot) => {
    let id = bot.id
    const currentBots = this.state.bots;
    const currentArmy= this.state.army;

    this.setState({
      bots: currentBots.filter(bot => bot.id !== id),
      army: currentArmy.filter(bot => bot.id !== id)
    });
    
      axios.delete(`http://localhost:6001/bots/${id}`, this.state)
      .then(response => {
        if (response.status === 'error') {
          this.setState({
            bots: currentBots,
            army: currentArmy
          });
        } else {
        }
      });
  }   

  render() {
    return (
      <div>
        <div>
          <YourBotArmy
          botData={this.state.army}
          releaseFromArmy={this.releaseFromArmy}
          deleteForever={this.deleteForever}/> 
          
        </div>
        <div>
          <BotCollection 
            botData={this.state.bots}
            addToArmy={this.addToArmy}
            deleteForever={this.deleteForever}/>

        </div>
    </div>
    )
  }
}


export default BotsPage;
