import React, { Component } from "react";
import BotCard from "../components/BotCard";
import SortBar from "../components/SortBar";

class BotCollection extends Component {
  //your code here
  state = {
    filter: [],
    sort: "id",
  };

  sortBarOnChange = (e, { name, value }) => {
    this.setState({
      [name]: value,
    });
  };

  filterBotCollection = () => {
    let botCollection = [...this.props.botCollection];
    const { filter, sort } = this.state;

    if (filter.length > 0) {
      botCollection = botCollection.filter((bot) =>
        filter.includes(bot.bot_class)
      );
    }

    botCollection.sort((bot1, bot2) => (bot1[sort] > bot2[sort] ? 1 : -1));

    return botCollection;
  };

  render() {
    const filterBotCollection = this.filterBotCollection();
    return (
      <div>
        <SortBar
          filter={this.state.filter}
          sort={this.state.sort}
          sortBarOnChange={this.sortBarOnChange}
        />
        <div className="ui four column grid">
          <div className="row">
            {filterBotCollection.map((bot) => (
              <BotCard
                key={bot.id}
                bot={bot}
                botClickHandle={this.props.cardClickHandler}
                deleteBot={this.props.deleteBot}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default BotCollection;
