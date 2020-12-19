import React, { Component } from "react";
import BotCard from "../components/BotCard";

class BotCollection extends Component {
  //your code here

  render() {
    return (
      <div className="ui four column grid">
        <div className="row">
          {this.props.botsData.map((bot) => (
            <BotCard
              bot={bot}
              key={bot.id}
              handleClick={this.props.myBotArmy}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default BotCollection;
