import React, { Component } from "react";
import BotCollection from "./BotCollection";
import YourBotArmy from "./YourBotArmy"
import BotSpecs from "../components/BotSpecs"
import SortBar from "../components/SortBar"

const URL="http://localhost:6001/bots"
class BotsPage extends Component {
  //start here with your code for step one
  //ok
  
  state = {
    bots: [],             // hold all the bots
    enlisted: [],         // holds the ids of the enlisted bots
    specsView: false,     // when not false, display BotSpecs
    classView: []         // store classes to filter bot container by
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

  showSpecs = (specBot) => {
    // set the state to specBot
    this.setState({specsView: specBot})
  }

  closeSpecs = () => {
    this.setState({specsView: false})
  }

  sortBy = (sortBy) => {
    // sort the bots by whatever user selects in sortBar, no state needed
    this.setState({bots: this.state.bots.sort((bot1, bot2)=>(bot1[sortBy] > bot2[sortBy])? 1 : -1)})
  }

  botCollectionMinusYourArmy = () => {
    let wellFilteredBots = this.state.bots.filter(bot => this.justEnlistedBots().indexOf(bot) === -1)
    // added in logic for radio button selecting class
    return (this.state.classView.length===0) ?  wellFilteredBots : wellFilteredBots.filter(findBot => this.state.classView.indexOf( findBot["bot_class"] )!== -1) 
  }

  viewByClass = (classSelect) => {
    console.log(classSelect)
    this.setState({classView: [...this.state.classView, classSelect]})
  }

  resetClassView = () => {
    this.setState({classView: []})
  }

  render() {
    return <div>
                <div>
                  <YourBotArmy bots={this.justEnlistedBots()} release={this.releaseBot} discharge={this.dischargeBot} />
                </div>
                <div>
                  <SortBar sortby={this.sortBy} reset={this.resetClassView} classView={this.state.classView} viewByClass={this.viewByClass}/>
                </div>
                <div>
                  {(this.state.specsView)?
                  <BotSpecs bot={this.state.specsView} goback={this.closeSpecs} enlist={this.enlistBot} />
                  :<BotCollection bots={this.botCollectionMinusYourArmy()} enlist={this.showSpecs} discharge={this.dischargeBot} />}
                </div>
      
          </div>;
  }
}

export default BotsPage;
