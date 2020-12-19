import React, { Component } from "react";
import BotCard from "../components/BotCard"
import BotSpecs from "../components/BotSpecs"

class YourBotArmy extends Component {
  //your bot army code here...

  renderBots = () => {
    let botsArray = this.props.army
    return botsArray.map((bot, index) => <BotCard bot={bot} key={index} clickAction={this.props.removeBot} deleteRobot={this.props.deleteRobot}/>)
  }

  render() {

    return (
      <div className="ui segment inverted olive bot-army">
        <div className="ui five column grid">
          <div className="row bot-army-row">
            {/*...and here...*/}
            {this.renderBots()}
          </div>
        </div>
      </div>
    );
  }
}

export default YourBotArmy;
