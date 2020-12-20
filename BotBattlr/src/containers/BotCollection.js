import React, { Component } from "react";
import BotCard from "../components/BotCard"

class BotCollection extends Component {
  //your code here

  render() {
    return (
      <div className="ui four column grid">
        <div className="row">
          {this.props.botData.map(
            bot => <BotCard bot={bot} armyAction={this.props.recruitArmy} key={bot.id} destroyBot={this.props.destroyBot}/>
          )}
          {/* Collection of all bots */}
        </div>
      </div>
    );
  }
}

export default BotCollection;
