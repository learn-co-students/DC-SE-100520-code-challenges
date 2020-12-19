import React, { Component } from "react";
import BotCard from "../components/BotCard";

class YourBotArmy extends Component {
  //your bot army code here...

  render() {
    return (
      <div className="ui segment inverted olive bot-army">
        <div className="ui five column grid">
          <div className="row bot-army-row">
          {this.props.botArmy.map((bot) => (
            <BotCard
              key={bot.id}
              bot={bot}
              botClickHandle={this.props.removeBotArmyHandler}
              deleteBot={this.props.deleteBot}
              isArmy={true}
            />
          ))}
          </div>
        </div>
      </div>
    );
  }
}

export default YourBotArmy;
