import React, { Component } from "react";
import YourBotArmy from "./YourBotArmy";
import BotCollection from "./BotCollection";

const url = "http://localhost:6001/bots";
class BotsPage extends Component {
  //start here with your code for step one
  state = {
    botCollection: [],
    botArmy: [],
  };

  componentDidMount() {
    fetch(url)
      .then((res) => res.json())
      .then((botCollection) => this.setState({ botCollection }))
      .catch((err) => console.log(err));
  }

  addBotArmyHandle = (id) => {
    if (!this.state.botArmy.some((bot) => bot.id === id)) {
      this.setState({
        botArmy: [
          ...this.state.botArmy,
          this.state.botCollection.find((bot) => bot.id === id),
        ],
      });
    }
  };

  removeBotArmyHandle = (id) => {
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
      this.removeBotArmyHandle(id);
    }
  };

  render() {
    const { botCollection, botArmy } = this.state;
    const { addBotArmyHandle, removeBotArmyHandle, deleteBot } = this;

    return (
      <div>
        <YourBotArmy
          botArmy={botArmy}
          removeBotArmyHandle={removeBotArmyHandle}
        />
        <BotCollection
          botCollection={botCollection}
          addBotArmyHandle={addBotArmyHandle}
          deleteBot={deleteBot}
        />
      </div>
    );
  }
}

export default BotsPage;
