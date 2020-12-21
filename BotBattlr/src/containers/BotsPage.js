import React, { Component } from "react";
import BotCollection from "./BotCollection";
import YourBotArmy from "./YourBotArmy";
import BotSpecs from "../components/BotSpecs";

const URL = "http://localhost:6001/bots";

class BotsPage extends Component {
  //start here with your code for step one
  state = {
    bots: [],
    myBots: [],
    showOne: null,
  };

  async componentDidMount() {
    const response = await fetch(URL);
    const bots = await response.json();

    this.setState({ bots });
  }

  myBotArmy = (bot) => {
    if (!this.state.myBots.includes(bot)) {
      this.setState({ myBots: [...this.state.myBots, bot] });
    }
  };

  releaseBot = (bot) => {
    //releaseBot should delete this bot from my bot army array
    let botsLeft = this.state.myBots.filter((oldBot) => oldBot !== bot);

    this.setState({ myBots: botsLeft });
  };

  deleteABot = (botId) => {
    fetch(URL + "/" + botId, {
      method: "DELETE",
    }).then(() =>
      this.setState({
        myBots: this.state.myBots.filter((bot) => bot.id !== botId),
        bots: this.state.bots.filter((bot) => bot.id !== botId),
      })
    );
  };

  showOneBot = (bot) => {
    this.setState({ showOne: bot });
  };

  showAllBot = () => {
    //if showOne is equal to null all the bots are shown
    this.setState({ showOne: null });
  };

  renderCollection = () => {
    if (this.state.showOne === null) {
      return (
        <BotCollection
          botsData={this.state.bots}
          handleClick={this.showOneBot}
          deleteABot={this.deleteABot}
        />
      );
    } else {
      return (
        <BotSpecs
          bot={this.state.showOne}
          showAllBot={this.showAllBot}
          myBotArmy={this.myBotArmy}
        />
      );
    }
  };

  render() {
    return (
      <div>
        <YourBotArmy
          botsData={this.state.myBots}
          releaseBot={this.releaseBot}
          deleteABot={this.deleteABot}
        />

        {this.renderCollection()}
      </div>
    );
  }
}

export default BotsPage;
