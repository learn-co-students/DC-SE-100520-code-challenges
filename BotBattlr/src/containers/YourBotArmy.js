import React, { Component } from "react";
import BotCard from "../components/BotCard";

class YourBotArmy extends Component {
  //your bot army code here...

  render() {
    return (
      <div className="ui segment inverted olive bot-army">
        <div className="ui five column grid">
          <div className="row bot-army-row">
            {this.props.botsData.map((bot) => (
              <BotCard
                bot={bot}
                key={bot.id}
                handleClick={this.props.releaseBot}
                deleteABot={this.props.deleteABot}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default YourBotArmy;
