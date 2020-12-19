import React, { Component } from "react";
import BotCard from "../components/BotCard"

class BotCollection extends Component {
  //your code here

  render() {
    return (
      <div className="ui four column grid">
        <div className="row">
          {this.props.bots.map(bot => <BotCard key={`this${bot.id}`} bot={bot} clickFunction={this.props.enlist} discharge={this.props.discharge} />)}
          Collection of all bots
        </div>
      </div>
    );
  }
}

export default BotCollection;
