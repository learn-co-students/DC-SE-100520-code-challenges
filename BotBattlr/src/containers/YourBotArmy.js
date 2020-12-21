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
              //in my components browser viewer I can see my bots are being added to the army bots array, I'm having an issue with the bots now rendering in the green area above, maybe I'm targeting the wrong element of the web app, or rendering the wrong comoponet. honestly I'm surprised the new bot army isn't rendering to the page
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default YourBotArmy;
