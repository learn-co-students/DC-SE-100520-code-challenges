import React, { Component } from "react";
import BotCard from '../components/BotCard'

class YourBotArmy extends Component {
  //your bot army code here...

  render() {
    return (
      <div className="ui segment inverted olive bot-army">
        <div className="ui five column grid">
          <div className="row bot-army-row">
            {
              this.props.myBots.map(bot =>
              <BotCard 
                bot={bot}
                key={bot.id}
                handleClick={this.props.remove}
              />
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

export default YourBotArmy;
