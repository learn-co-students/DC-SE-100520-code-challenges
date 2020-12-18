import React, { Component } from "react";
import BotCollection from './BotCollection'

class BotsPage extends Component {

constructor() {
  super()
  this.state = {
    bots: []
  }
}

  async componentDidMount() {
   let response = await fetch('http://localhost:6001/bots')
   let json = await response.json()
   this.setState({
     bots: json
   })
  }

  render() {
    return <div>{<BotCollection bots={this.state.bots}/>}</div>;
  }
}

export default BotsPage;
