import React, { Component } from "react";
import BotCard from "../components/BotCard";
import BotSpecs from '../components/BotSpecs'

class BotCollection extends Component {
  //your code here

  render() {
    return (
     <div>
      <label>
        <select onChange={(e) => this.props.filterBots(e.target.value)}>
        <option value="All">All</option>
          <option value="Captain">Captain</option>
          <option value="Assault">Assault</option>
          <option value="Defender">Defender</option>
          <option value="Support">Support</option>
          <option value="Medic">Medic</option>
        </select>
        </label>
        <p></p>
        <p></p>
    
     
      
      <div className="ui four column grid">
        <div className="row">
          {this.props.bots.map((bot) => (
            <BotCard
              key={bot.id}
              bot={bot}
              addBots={this.props.addBots}
              deleteBots={this.props.deleteBots}
            />
             
          ))}
          
        </div>
      </div>
     
    </div>
    
    );
  }
}

export default BotCollection;
