import React, { Component } from "react";
import BotCard from '../components/BotCard'

class YourBotArmy extends Component {
  //your bot army code here...

  render() {
    return (
      <div className="ui segment inverted olive bot-army">
      <div>Your Bot Army</div>
        <div className="ui five column grid">
          <div className="row bot-army-row">
            
            {this.props.bots.map(bot => <BotCard  bot={bot} clickAction={this.props.removeBot} key={bot.id} />)}
          </div>
        </div>
      </div>
    );
  }
}

export default YourBotArmy;
