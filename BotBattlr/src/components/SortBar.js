import React, { Component } from 'react'

export default class SortBar extends Component {
    render() {
        return (
            <div className="sortBar" >
                <form>
                    <label>
                        Sort by:
                        <select className="ui compact menu" onChange={(e)=>this.props.sortby(e.target.value)}>    
                        
                            <option value="health"  >❤ Health</option>
                            <option value="damage"  >🗲 Damage</option>
                            <option value="armor"  >⛨ Armor</option>
                        </select>
                    </label>
                </form>
            </div>
        )
    }
}

