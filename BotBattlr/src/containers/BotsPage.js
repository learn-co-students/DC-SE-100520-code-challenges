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

  addBotArmyHandle = (bot) => {
    if (!this.state.botArmy.includes(bot)) {
      this.setState({ botArmy: [...this.state.botArmy, bot] });
    }
  };

  removeBotArmyHandle = (bot) => {
    this.setState({
      botArmy: [
        ...this.state.botArmy.filter((botArmy) => botArmy.id !== bot.id),
      ],
    });
  };

  render() {
    const { botCollection, botArmy } = this.state;

    return (
      <div>
        <YourBotArmy
          botArmy={botArmy}
          removeBotArmyHandle={this.removeBotArmyHandle}
        />
        <BotCollection
          botCollection={botCollection}
          addBotArmyHandle={this.addBotArmyHandle}
        />
      </div>
    );
  }
}

export default BotsPage;
