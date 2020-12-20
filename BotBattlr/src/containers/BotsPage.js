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

  render() {
    return (
      <div>
          <div>
            <YourBotArmy botData={this.state.army} /> 
          </div>
          <div>
            <BotCollection botData={this.state.bots} recruitArmy={this.recruitArmy} />
          </div>
        </div>
    );
  }
}

export default BotsPage;
