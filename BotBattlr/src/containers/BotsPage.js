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
      this.setState({
        botArmy: [
          ...this.state.botArmy,
          this.state.botCollection.find((b) => b.id === id),
        ],
      });
      this.goBackHandler();
    }
  };

  removeBotArmyHandler = (id) => {
    console.log(id)
    this.setState({
      botArmy: [...this.state.botArmy.filter((botArmy) => botArmy.id !== id)],
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
      .then((json) => this.dischargeBot(id))
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

  render() {
    const { botCollection, botArmy, botSpecs } = this.state;
    const {
      cardClickHandler,
      removeBotArmyHandler,
      deleteBot,
      goBackHandler,
      addBotArmyHandler,
    } = this;

    const renderCollection = this.state.botSpecsActive ? (
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

    return (
      <div>
        <YourBotArmy
          botArmy={botArmy}
          removeBotArmyHandler={removeBotArmyHandler}
        />
        {renderCollection}
      </div>
    );
  }
}

export default BotsPage;
