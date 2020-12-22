import React, { Component } from "react";
import BotCard from '../components/BotCard'


class YourBotArmy extends Component {
  //your bot army code here...

 
  

  render() {
    return (
      <div className="ui segment inverted olive bot-army">
        <div className="ui five column grid">
          <div className="row bot-army-row">
            Your Bot Army
            {this.props.bots.map((bot) => (
              <BotCard
                bot={bot}
                key={bot.id}
                clickAction={this.props.removeBotFromArmy}
                deleteBotForever={this.deleteBotForever}
              />
            )) }
            {/* {...this.deleteBotForever.includes(this.props.bot) ? true : this.props.bot === ""} */}
          </div>
        </div>
      </div>
    );
  }
}

export default YourBotArmy;
