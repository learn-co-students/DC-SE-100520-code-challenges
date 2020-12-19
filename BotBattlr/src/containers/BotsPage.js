import React, { Component } from "react";

import BotSpecs from "../components/BotSpecs";

import YourBotArmy from "./YourBotArmy";
import BotCollection from "./BotCollection";

const url = "http://localhost:6001/bots";
class BotsPage extends Component {
  //start here with your code for step one
  state = {
    botCollection: [],
    botArmy: [],
    botSpecsActive: false,
    botSpecs: {},
  };

  componentDidMount() {
    fetch(url)
      .then((res) => res.json())
      .then((botCollection) => this.setState({ botCollection }))
      .catch((err) => console.log(err));
  }

  cardClickHandler = (id) => {
    this.setState({
      botSpecsActive: true,
      botSpecs: this.state.botCollection.find((bot) => bot.id === id),
    });
  };

  goBackHandler = () => {
    this.setState({
      botSpecsActive: false,
      botSpecs: {},
    });
  };

  addBotArmyHandler = (id) => {
    if (!this.state.botArmy.some((bot) => bot.id === id)) {
      let botCollection = [...this.state.botCollection];
      const idx = botCollection.findIndex((bot) => bot.id === id);
      const bot = botCollection.splice(idx, 1)[0];
      this.setState({
        botArmy: [...this.state.botArmy, bot],
        botCollection: botCollection,
      });
      this.goBackHandler();
    }
  };

  removeBotArmyHandler = (id) => {
    let botArmy = [...this.state.botArmy];
    const idx = botArmy.findIndex((bot) => bot.id === id);
    const bot = botArmy.splice(idx, 1)[0];
    this.setState({
      botArmy: botArmy,
      botCollection: [...this.state.botCollection, bot],
    });
  };

  deleteBot = (id) => {
    const deleteUrl = `${url}/${id}`;
    const reqObj = {
      method: "DELETE",
    };
    console.log(deleteUrl, reqObj);

    fetch(deleteUrl, reqObj)
      .then((res) => res.json())
      .then(() => this.dischargeBot(id))
      .catch((err) => console.log(err));
  };

  dischargeBot = (id) => {
    let botCollection = [...this.state.botCollection];
    const updatedBotCollection = botCollection.filter((bot) => bot.id !== id);
    this.setState({
      botCollection: updatedBotCollection,
    });

    if (this.state.botArmy.some((bot) => bot.id === id)) {
      this.removeBotArmyHandler(id);
    }
  };

  renderCollection = () => {
    const { botSpecs, botCollection } = this.state;
    const {
      goBackHandler,
      addBotArmyHandler,
      cardClickHandler,
      deleteBot,
    } = this;

    return this.state.botSpecsActive ? (
      <BotSpecs
        bot={botSpecs}
        goBackHandler={goBackHandler}
        addBotArmyHandler={addBotArmyHandler}
      />
    ) : (
      <BotCollection
        botCollection={botCollection}
        cardClickHandler={cardClickHandler}
        deleteBot={deleteBot}
      />
    );
  };

  render() {
    const renderCollection = this.renderCollection();

    return (
      <div>
        <YourBotArmy
          botArmy={this.state.botArmy}
          removeBotArmyHandler={this.removeBotArmyHandler}
        />
        {renderCollection}
      </div>
    );
  }
}

export default BotsPage;
