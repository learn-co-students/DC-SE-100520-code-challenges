import React, { Component } from "react";
import BotCard from "../components/BotCard"

class BotCollection extends Component {
  //your code here

  render() {
    return (
      <div className="ui four column grid">
        <div className="row">
          {this.props.botData.map(
            bot => <BotCard bot={bot} recruitArmy={this.props.recruitArmy} key={bot.id}/>
          )}
          {/* Collection of all bots */}
        </div>
      </div>
    );
  }
}

export default BotCollection;
