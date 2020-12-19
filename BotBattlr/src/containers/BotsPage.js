import React, { Component } from "react";
import BotCollection from './BotCollection'

const API = "http://localhost:6001/bots";

class BotsPage extends Component {
  //start here with your code for step one

  state = {
    bots: [],
  }

  async componentDidMount(){
    const response = await fetch(API);
    const botData = await response.json();
    this.setState({bots: botData})
  }


  render() {
    return <div>{<BotCollection bots={this.state.bots}/>}</div>;
  }
}

export default BotsPage;
