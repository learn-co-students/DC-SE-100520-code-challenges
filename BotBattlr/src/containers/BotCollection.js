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
              clickAction={this.props.handleAddToArmy}
              key={bot.id}
              bot={bot}
              deleteBot={this.props.handleDeleteBot}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default BotCollection;
