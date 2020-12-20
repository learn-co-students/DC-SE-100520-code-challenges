import React, { Component } from "react";
// import BotSpecs from '../components/BotSpecs'
import BotCard from '../components/BotCard'
class YourBotArmy extends Component {
  //your bot army code here...

  render() {
    return (
      <div className="ui segment inverted olive bot-army">
        <div className="ui five column grid">
          <div className="row bot-army-row">
            Your Bot Army{this.props.botData.map(
              bot => <BotCard clickAction={this.props.removeBot} handleClick={this.props.botDischarge} botData={bot} key={bot.id}/>
            )
          /*...and here...*/}
          </div>
        </div>
      </div>
    );
  }
}

export default YourBotArmy;
