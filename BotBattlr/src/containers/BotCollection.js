import React, { Component } from "react";
import BotCard from '../components/BotCard'

class BotCollection extends Component {
  //your code here

  render() {
    return (
      <div className="ui four column grid">
        <div>Collection of all Bots</div>
        <div className="row">
          {/* mapping throughthe bots to create a new botcard component for each bot and giving each card the properties it needs for said bot */}
          {this.props.bots.map( bot => 
            <BotCard bot={bot} key={bot.id} clickAction={this.props.addBot} deleteBot={this.props.deleteBot} />
          )}
        </div>
      </div>
    );
  }
}

export default BotCollection;
