import React, { Component } from "react";
import BotCard from "../components/BotCard"

class BotCollection extends Component {
  //your code here


  render() {
    return (
      <div className="ui four column grid">
        <div className="row">
          {this.props.bots.map((bot) => (
            <BotCard
              key={bot.id}
              bot={bot}
              clickAction={this.props.addToBotArmy}
              deleteBotForever={this.props.deleteBotForever}
            />
          ))}
          ;
        </div>
      </div>
    );
  }
}

export default BotCollection;
