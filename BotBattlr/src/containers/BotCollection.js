import React, { Component } from "react";
import BotCard from '../components/BotCard'

class BotCollection extends Component {
  //your code here

  render() {
    return (
      <div className="ui four column grid">
        <div className="row">
          {
            this.props.allBots.map((bot, index) =>
            <BotCard
              bot={bot}
              key={index}
              handleClick={this.props.addToArmy}
              discharge={this.props.discharge}
            />
            )
          }
          
        </div>
      </div>
    );
  }
}

export default BotCollection;
