import React, { Component } from "react";
import BotCollection from "./BotCollection";
import YourBotArmy from "./YourBotArmy"

const URL="http://localhost:6001/bots"
class BotsPage extends Component {
  //start here with your code for step one
  //ok
  
  state = {
    bots: [],             // hold all the bots
    enlisted: []          // holds the ids of the enlisted bots
  }

  componentDidMount(){
    this.getTheBots()    
  }
  
  async getTheBots() {
    // fetch the bots from our API
    let botsFetch = await fetch(URL)
    let bots = await botsFetch.json()
    this.setState({bots})
  }
  
  enlistBot = (enlistBot) => {
    // if you can't find enlistBot's Id in state.enlisted, add it to the array
    (!this.state.enlisted.find(botId => botId === enlistBot.id)) ? 
    this.setState((state) => ({ enlisted: [...state.enlisted, enlistBot.id]})) 
    : console.log("Ayy this bot already enlisted!"); 
  }

  justEnlistedBots = () => {
    // since we are just storing id's in the state.enlisted array,
    // filter the bots array for only bots whose id's you can find 
    // in the enlisted array
    return this.state.bots.filter(bot => this.state.enlisted.find(searchId => searchId === bot.id))
  }

  releaseBot = (releaseThisBot) => {
    //find the id of the bot in state enlisted array, 
    const releaseId = this.state.enlisted.findIndex(enlistIndex => enlistIndex === releaseThisBot.id);
    
    // remove it, 
    this.state.enlisted.splice(releaseId, 1)
    
    // and set the state
    this.setState({enlisted: this.state.enlisted});
  }

  dischargeBot = (e, byeByeBot) => {
    // when you click delete, keep the event on the delete button from triggering anything else
    // but only if it's coming straight in, if it's coming from another delete event, e is already undefined
    if(e)e.stopPropagation();
    
    // delete on the server
    fetch(`${URL}/${byeByeBot.id}`, {method: "DELETE"})
    
    // delete in state
    const bots = this.state.bots.filter(bot => bot !== byeByeBot)
    this.setState( {bots} )
  }

  dischargeEnlistedBot = (e, byeByeBot) => {
    // when you click delete, keep the event on the delete button from triggering anything else
    e.stopPropagation();

    // take the bot out of enlisted bots array
    this.releaseBot(byeByeBot)
    
    // continue delete as normal
    this.dischargeBot(byeByeBot)
  }

  render() {
    return <div>
                <div>
                  <YourBotArmy bots={this.justEnlistedBots()} release={this.releaseBot} discharge={this.dischargeBot} />
                </div>

                <div>
                  <BotCollection bots={this.state.bots} enlist={this.enlistBot} discharge={this.dischargeBot} />
                </div>
      
          </div>;
  }
}

export default BotsPage;
