import React, { Component } from "react";
import BotCollection from "./BotCollection";
import YourBotArmy from "./YourBotArmy";

const botsUrl = "http://localhost:6001/bots";

class BotsPage extends Component {
  state = {
    bots: [],
    myArmy: [],
  };

  componentDidMount() {
    fetch(botsUrl)
      .then((response) => response.json())
      .then((data) => this.setState({ bots: data }));
  }

  addToArmy = (id) => {
    if (!this.state.myArmy.includes(id))
      this.setState({
        myArmy: [...this.state.myArmy, id],
      });
  };

  render() {
    const army = this.state.bots.filter((bot) =>
      this.state.myArmy.includes(bot.id)
    );
    return (
      <div>
        <YourBotArmy botsData={army} />
        <BotCollection
          botsData={this.state.bots}
          handleAddToArmy={this.addToArmy}
        />
      </div>
    );
  }
}

export default BotsPage;
