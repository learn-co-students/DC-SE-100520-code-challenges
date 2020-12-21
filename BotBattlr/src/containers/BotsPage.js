import React, { Component } from "react";

import BotCollection from "./BotCollection"; 
import YourBotArmy from "./YourBotArmy"

const baseURL = "http://localhost:6001/bots"; 

class BotsPage extends Component {
  //Step 1 
  state = {
    bots: [],
    botArmy: []
  }
  componentDidMount(){
    fetch(baseURL)
    .then(r => r.json())
    .then(bots => this.setState({
      bots: bots
    }))
  }

  ctoAdd = (id) => {
    if(!this.state.botArmy.includes(id)){
      this.setState({
        botArmy: [...this.state.botArmy, id]
      })
    }
  }

  //keeps everything that doesnt match with the ID 
  ctoRemove = (id) => {
    this.setState({
      botArmy: [...this.state.botArmy.filter(roboId => roboId !== id)]
    })
  }

  ctoDestroy = (id) => {
    let botToDelete = [...this.state.bots].filter(b => b.id !== id)
    //removes from backend 
    fetch(baseURL + "${id}", {
        method: "DELETE"
    }).then(() => this.setState({
      bots: botToDelete
    }))
    //removes from frontend
    this.ctoRemove(id)
  }

  render() {
    
    let myBots = this.state.botArmy.map(bId => this.state.bots.find(b => b.id == bot.id) )
    return (
    <div>

        <div>
            <YourBotArmy myBots={myBots}
                ctoRemove={this.ctoRemove}
                ctoDestroy={this.ctoDestroy}
            />
        </div>
          
        <div>
            <BotCollection bots= {this.state.bots}
                    cToAdd= {this.cToAdd}
                    ctoDestroy={this.ctoDestroy}
            />
        </div>
      
      
    </div>
    )
  }
}

export default BotsPage;
