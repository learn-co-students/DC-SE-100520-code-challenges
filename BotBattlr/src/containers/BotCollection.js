import React, { Component } from "react";
import BotCard from '../components/BotCard'
// import BotSpecs from '../components/BotSpecs'

class BotCollection extends Component {
  //your code here

  render() {
    return (
      <div className="ui four column grid">
        <div className="row">
          {this.props.bots.map(bot => 
          <BotCard key={bot.id} bot={bot} addBots={this.props.addBots}/>)
          }
      
          Collection of all bots
        </div>
      </div>
    );
  }
}

export default BotCollection;
