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
    filter: [],
    sort: "id",
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
    let botCollection = [...this.state.botCollection];
    const idx = botCollection.findIndex((bot) => bot.id === id);
    const bot = botCollection.splice(idx, 1)[0];
    if (!this.state.botArmy.some((botA) => botA.bot_class == bot.bot_class)) {
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

  //remove from backend
  deleteBot = (id, isFromBotArmy) => {
    const deleteUrl = `${url}/${id}`;
    const reqObj = {
      method: "DELETE",
    };

    fetch(deleteUrl, reqObj)
      .then((res) => res.json())
      .then(() => this.dischargeBot(id, isFromBotArmy))
      .catch((err) => console.log(err));
  };

  //remove from frontend
  dischargeBot = (id, isFromBotArmy) => {
    const collectionKey = isFromBotArmy ? "botArmy" : "botCollection";
    let botCollection = [...this.state[collectionKey]];
    const updatedBotCollection = botCollection.filter((bot) => bot.id !== id);
    this.setState({
      [collectionKey]: updatedBotCollection,
    });
  };

  sortBarOnChange = (e, { name, value }) => {
    this.setState({
      [name]: value,
    });
  };

  filterBotCollection = () => {
    let botCollection = [...this.state.botCollection];
    const { filter, sort } = this.state;

    if (filter.length > 0) {
      botCollection = botCollection.filter((bot) =>
        filter.includes(bot.bot_class)
      );
    }

    botCollection.sort((bot1, bot2) => (bot1[sort] > bot2[sort] ? 1 : -1));

    return botCollection;
  };

  renderCollection = () => {
    const { botSpecs, filter, sort } = this.state;
    const {
      goBackHandler,
      addBotArmyHandler,
      cardClickHandler,
      deleteBot,
      sortBarOnChange,
      filterBotCollection,
    } = this;

    return this.state.botSpecsActive ? (
      <BotSpecs
        bot={botSpecs}
        goBackHandler={goBackHandler}
        addBotArmyHandler={addBotArmyHandler}
      />
    ) : (
      <BotCollection
        botCollection={filterBotCollection()}
        cardClickHandler={cardClickHandler}
        deleteBot={deleteBot}
        filter={filter}
        sort={sort}
        sortBarOnChange={sortBarOnChange}
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
          deleteBot={this.deleteBot}
        />
        {renderCollection}
      </div>
    );
  }
}

export default BotsPage;
