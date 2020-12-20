import React, { Component } from "react";
import BotCollection from "./BotCollection"
import YourBotArmy from "./YourBotArmy"
import BotSpecs from "../components/BotSpecs"
import SortBar from "../components/SortBar"

class BotsPage extends Component {
  //start here with your code for step one
  constructor(props){
    super(props);
    this.URL = "http://localhost:6001/bots"
    this.state = {
      bots: [],
      myBots: [],
      botsSorted: [],
      botToShow: null
    }
  }

  async componentDidMount() {
    const res = await fetch(this.URL);
    const data = await res.json();
    this.setState({bots: data, botsSorted: data});
  }

  addBotToArmy = (bot) => {
    if(this.state.myBots.includes(bot)) return
    if(this.state.myBots.some(aBot => aBot.bot_class === bot.bot_class))return alert("Already have a bot of that class")
    this.setState({myBots: [bot, ...this.state.myBots]})
    const newBots = this.state.botsSorted.filter(b => !(b.id === bot.id))
    this.setState({botsSorted: newBots})
  }

  displayBot = (bot) => {
    this.setState({botToShow: bot});
  }

  goBack = () => {
    this.setState({botToShow: null});
  }

  setBots = (bots) => {
    this.setState({botsSorted: bots});
  }

  removeFromArmy = (deadBot) => {
    const newArmy = this.state.myBots.filter(bot => !(bot.id === deadBot.id));
    this.setState({myBots: newArmy});
    this.setState({bots: [deadBot, ...this.state.botsSorted]});
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
      <SortBar bots={this.state.bots} setBots={this.setBots}/>
      {this.state.botToShow === null ? 
      <YourBotArmy deleteButton={this.endBotsLife} handleClick={this.removeFromArmy} bots={this.state.myBots}/>
      : <BotSpecs goBack={this.goBack} addToArmy={this.addBotToArmy} bot={this.state.botToShow}/> }
      <BotCollection deleteButton={this.endBotsLife} handleClick={this.displayBot} bots={this.state.botsSorted}/>
    </div>;
  }
}

export default BotsPage;
