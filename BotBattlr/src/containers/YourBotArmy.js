import React, { Component } from "react";
import BotCard from "../components/BotCard";

class YourBotArmy extends Component {
  render() {
    const bots = this.props.bots.map((bot) => {
      return (
        <BotCard
          key={bot.id}
          bot={bot}
          enlistBot={this.props.enlistBot}
          // destroyBot={this.props.destroyBot}
        />
      );
    });
    return (
      <div className="ui segment inverted olive bot-army">
        <div className="ui five column grid">
          <div className="row bot-army-row">{bots}</div>
        </div>
      </div>
    );
  }
}

export default YourBotArmy;
