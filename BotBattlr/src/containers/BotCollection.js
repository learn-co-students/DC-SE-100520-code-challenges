import React, { Component } from "react";
import BotCard from "../components/BotCard";

class BotCollection extends Component {
  render() {
    return (
      <div className="ui four column grid">
        <div className="row">
          {this.props.botsData.map((bot) => (
            <BotCard
              bot={bot}
              key={bot.id}
              handleClick={this.props.handleClick}
              deleteABot={this.props.deleteABot}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default BotCollection;
