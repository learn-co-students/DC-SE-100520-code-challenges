import React, { Component } from "react";
import BotCard from "../components/BotCard"

class BotCollection extends Component {
  //your code here

  render() {
    return (
      <div className="ui four column grid">
        <div className="row">
          {this.props.bots.map(bot => <BotCard deleteButton={this.props.deleteButton} handleClick={this.props.handleClick} key={bot.id} bot={bot}/>)}
        </div>
      </div>
    );
  }
}

export default BotCollection;
