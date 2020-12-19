import React, { Component } from "react";
import YourBotArmy from "./YourBotArmy";
import BotCollection from "./BotCollection";
import Nav from "../components/Nav";

class BotsPage extends Component {
  state = {
    botCollection: [],
    army: [],
    sort: "id",
    filter: "All",
  };

  componentDidMount = async () => {
    const botString = await fetch("http://localhost:6001/bots");
    const json = await botString.json();
    this.setState({
      botCollection: json,
    });
  };

  enlistBot = (bot) => {
    if (this.state.army.includes(bot)) return;
    if (this.state.army.find((soldier) => bot.bot_class === soldier.bot_class))
      return alert("Armies may only contain one of each bot class!");
    const bots = [...this.state.botCollection];
    bots.splice(
      bots.findIndex((enlistee) => enlistee === bot),
      1
    );
    this.setState({
      army: [...this.state.army, bot],
      botCollection: bots,
    });
  };

  releaseBot = (bot) => {
    const army = [...this.state.army];
    const collection = [bot, ...this.state.botCollection];
    army.splice(
      army.findIndex((soldier) => soldier === bot),
      1
    );
    this.setState({
      army: army,
      botCollection: collection,
    });
  };

  destroyBot = (id) => {
    fetch(`http://localhost:6001/bots/${id}`, { method: "DELETE" });
    const bots = [...this.state.botCollection];
    bots.splice(
      bots.findIndex((soldier) => soldier.id === id),
      1
    );
    this.setState({
      botCollection: bots,
    });
  };

  setSort = (event) => {
    this.setState({
      sort: event.target.value,
    });
  };

  sortBots = (bots) => {
    const field = this.state.sort;
    bots.sort(function (a, b) {
      const field1 = a[field];
      const field2 = b[field];
      if (field1 > field2) {
        return -1;
      }
      if (field1 < field2) {
        return 1;
      }
      return 0;
    });
    return field === "id" ? bots.reverse() : bots;
  };

  setFilter = (event) => {
    this.setState({
      filter: event.target.outerText,
    });
  };

  render() {
    const collection =
      this.state.filter === "All"
        ? this.state.botCollection
        : this.state.botCollection.filter((bot) => {
            return bot.bot_class === this.state.filter;
          });
    return (
      <div>
        <YourBotArmy
          bots={this.sortBots(this.state.army)}
          destroyBot={this.destroyBot}
          enlistBot={this.releaseBot}
        />
        <Nav sort={this.setSort} setFilter={this.setFilter} />
        <BotCollection
          bots={this.sortBots(collection)}
          destroyBot={this.destroyBot}
          enlistBot={this.enlistBot}
        />
      </div>
    );
  }
}

export default BotsPage;
