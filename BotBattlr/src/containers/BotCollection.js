import React, { Component } from "react";
import BotCard from "../components/BotCard"
import BotSpecs from "../components/BotSpecs"



class BotCollection extends Component {
  //your code here

  renderBots = () => {
    let botsArray = this.props.bots
    return botsArray.map((bot) => <BotCard bot={bot} key={bot.id} clickAction={this.props.addBot} />)
  }
  
  render() {

    return (
      <div className="ui four column grid">
        <div className="row">
          {/*...and here..*/}
          {this.renderBots()}
        </div>
      </div>
    );
  }
}

export default BotCollection;
