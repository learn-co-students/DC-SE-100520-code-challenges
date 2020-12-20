import React, { Component } from "react";
import BotCard from '../components/BotCard'
class BotCollection extends Component {
  //your code here

 

  render() {
    
    return (
     
      <div className="ui four column grid">
        <div className="row">
          {this.props.botData.map(
            bot => <BotCard botData={bot} clickAction={this.props.addBot} handleClick={this.props.botDischarge}
            key={bot.id}/>
          )}
          Collection of all bots
        </div>
      </div>
    );
  }
}

export default BotCollection;
