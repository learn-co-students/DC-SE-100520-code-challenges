import React, { Component } from "react";
import BotCard from "../components/BotCard";
import SortBar from "../components/SortBar";

class BotCollection extends Component {
  //your code here
  render() {
    return (
      <div>
        <SortBar
          filter={this.props.filter}
          sort={this.props.sort}
          sortBarOnChange={this.props.sortBarOnChange}
        />
        <div className="ui four column grid">
          <div className="row">
            {this.props.botCollection.map((bot) => (
              <BotCard
                key={bot.id}
                bot={bot}
                botClickHandle={this.props.cardClickHandler}
                deleteBot={this.props.deleteBot}
                isArmy={false}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default BotCollection;
