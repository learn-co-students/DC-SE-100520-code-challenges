import React, { Component } from "react";
import BotCollection from "./BotCollection";
import YourBotArmy from "./YourBotArmy";

const URL = "http://localhost:6001/bots";

class BotsPage extends Component {
  //start here with your code for step one
  state = {
    bots: [],
    myBots: [],
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
    let botsLeft = this.state.myBots.filter((oldBot) => oldBot !== bot);

    this.setState({ myBots: botsLeft });
  };

  deleteABot = (botId) => {
    // fetch(URL + "/" + botId, {
    //   method: "DELETE",
    // }).then(() =>
    //   this.setState{(
    //     myBots: this.state.myBots.filter((bot) => bot.id !== botId)
    //   )}

    // )
    fetch(URL + "/" + botId, {
      method: "DELETE",
    }).then(() =>
      this.setState({
        myBots: this.state.myBots.filter((bot) => bot.id !== botId),
        bots: this.state.bots.filter((bot) => bot.id !== botId),
      })
    );
  };

  render() {
    return (
      <div>
        <YourBotArmy
          botsData={this.state.myBots}
          releaseBot={this.releaseBot}
          deleteABot={this.deleteABot}
        />
        <BotCollection
          botsData={this.state.bots}
          myBotArmy={this.myBotArmy}
          deleteABot={this.deleteABot}
        />
      </div>
    );
  }
}

export default BotsPage;
