import React, { Component } from "react";
import BotCollection from './BotCollection';
import YourBotArmy from './YourBotArmy'

class BotsPage extends Component {
  //start here with your code for step one

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

  render() {
    return (
      <div>
        <div>
          <YourBotArmy
          botData={this.state.army}
          releaseFromArmy={this.releaseFromArmy}/> 
          
        </div>
        <div>
          <BotCollection 
            botData={this.state.bots}
            addToArmy={this.addToArmy}/>

        </div>
    </div>
    )
  }
}


export default BotsPage;
