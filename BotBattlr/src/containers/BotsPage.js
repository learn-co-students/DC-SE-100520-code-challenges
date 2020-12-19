import React, { Component } from "react";
import BotCollection from "./BotCollection"
import YourBotArmy from "./YourBotArmy"

class BotsPage extends Component {
  //start here with your code for step one
  constructor(props){
    super(props);
    this.URL = "http://localhost:6001/bots"
    this.state = {
      bots: [],
      myBots: []
    }
  }

  async componentDidMount() {
    const res = await fetch(this.URL);
    const data = await res.json();
    this.setState({bots: data});
  }

  addBotToArmy = (bot) => {
    if(this.state.myBots.includes(bot)) return
    this.setState({myBots: [bot, ...this.state.myBots]})
  }

  removeFromArmy = (deadBot) => {
    const newArmy = this.state.myBots.filter(bot => !(bot.id === deadBot.id));
    this.setState({myBots: newArmy});
  }

   endBotsLife = (deadBot) => {
    fetch(this.URL + "/" + deadBot.id, {method: "DELETE"})
    .then(res => res.json())
    .then(console.log);
    const newBots = this.state.bots.filter(bot => !(bot.id === deadBot.id));
    this.setState({bots: newBots});
    this.removeFromArmy(deadBot);
  }

  render() {
    return <div>
      <YourBotArmy deleteButton={this.endBotsLife} handleClick={this.removeFromArmy} bots={this.state.myBots}/>
      <BotCollection deleteButton={this.endBotsLife} handleClick={this.addBotToArmy} bots={this.state.bots}/>
    </div>;
  }
}

export default BotsPage;
