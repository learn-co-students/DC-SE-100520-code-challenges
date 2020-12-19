import React, { Component } from "react";
import BotCard from "../components/BotCard";
import BotSpecs from "../components/BotSpecs";

class BotCollection extends Component {
  state = {
    display: false,
    displayBot: null,
  };

  toggleDisplay = (bot) => {
    let display;
    bot !== this.state.displayBot
      ? (display = true)
      : (display = !this.state.display);
    this.setState({
      display: display,
      displayBot: bot,
    });
  };

  render() {
    const bots = this.props.bots.map((bot) => {
      return (
        <BotCard
          bot={bot}
          key={bot.id}
          enlistBot={this.props.enlistBot}
          // destroyBot={this.props.destroyBot}
          display={this.toggleDisplay}
        />
      );
    });
    return (
      <div>
        {this.state.display ? (
          <BotSpecs
            destroyBot={this.props.destroyBot}
            bot={this.state.displayBot}
            enlistBot={this.props.enlistBot}
            display={this.toggleDisplay}
          />
        ) : null}
        <div class="collection">
          <div className="ui four column grid">
            <div className="row">{bots}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default BotCollection;
