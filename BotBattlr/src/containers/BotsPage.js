import React, { Component } from "react";
import BotCollection from "./BotCollection";
import YourBotArmy from "./YourBotArmy"

const URL="http://localhost:6001/bots"
class BotsPage extends Component {
  //start here with your code for step one
  //ok
  
  state = {
    bots: [],
    enlisted: []
  }

  componentDidMount(){
    this.getTheBots()
  }
  
  async getTheBots() {
    console.log("imma gettin ma bots!")
    let botsFetch = await fetch(URL)
    let bots = await botsFetch.json()
    this.setState({bots})
  }
  
  enlistBot = (enlistBot) => {
    //.name + " with id: " + enlistBot.Id + " once and only once"
    console.log("enlisting " + enlistBot);
    (!this.state.enlisted.find(botId => botId === enlistBot.id)) ? this.setState((state) => ({ enlisted: [...state.enlisted, enlistBot.id]})) : console.log("Ayy this bot already enlisted!");
    console.log(this.state.enlisted); 
  }

  justEnlistedBots = () => {
    // since we are just storing id's in the state.enlisted array,
    // filter the bots array for only bots whose id's you can find 
    // in the enlisted array
    return this.state.bots.filter(bot => this.state.enlisted.find(searchId => searchId === bot.id))
  }

  dischargeBot = (dischargeThisBot) => {
    console.log("discharging " + dischargeThisBot.name);
    //find the id of the bot in state enlisted array, remove it, and set the state
    const dischargeId = this.state.enlisted.findIndex(enlistIndex => enlistIndex === dischargeThisBot.id);
    console.log(dischargeId)
    this.state.enlisted.splice(dischargeId, 1)
    this.setState({enlisted: this.state.enlisted});
  }

  render() {
    return <div>
                <div>
                  <YourBotArmy bots={this.justEnlistedBots()} discharge={this.dischargeBot}/>
                </div>

                <div>
                  <BotCollection bots={this.state.bots} enlist={this.enlistBot} />
                </div>
      
          </div>;
  }
}

export default BotsPage;
