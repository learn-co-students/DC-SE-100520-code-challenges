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

  removeFromArmy = (id) => {
    const newArmy = this.state.myArmy.filter((bot) => bot != id);

    this.setState({
      myArmy: newArmy,
    });
  };

  deleteBot = (id) => {
    console.log(`bot ${id} will be deleted forever`);

    fetch(botsUrl + `/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  render() {
    const army = this.state.bots.filter((bot) =>
      this.state.myArmy.includes(bot.id)
    );
    return (
      <div>
        <YourBotArmy botsData={army} handleRemove={this.removeFromArmy} />
        <BotCollection
          botsData={this.state.bots}
          handleAddToArmy={this.addToArmy}
          handleDeleteBot={this.deleteBot}
        />
      </div>
    );
  }
}

export default BotsPage;
