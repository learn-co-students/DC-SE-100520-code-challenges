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
                  View By Class:
            <button onClick={() => this.props.reset()}>RESET View by Class</button>
          <table>
            <tbody>
             
            <tr>
                <td></td>
            <td><div><input value="Support" type="radio" checked={(this.props.classView.indexOf("Support") !== -1)} onChange={(e)=>this.props.viewByClass(e.target.value)} />Support</div></td>
            <td><div><input value="Medic" type="radio" checked={(this.props.classView.indexOf("Medic") !== -1)} onChange={(e)=>this.props.viewByClass(e.target.value)}/>Medic</div></td>
            <td><div><input value="Assault" type="radio" checked={(this.props.classView.indexOf("Assault") !== -1)} onChange={(e)=>this.props.viewByClass(e.target.value)}/>Assault</div></td>
            <td><div><input value="Defender" type="radio" checked={(this.props.classView.indexOf("Defender") !== -1)} onChange={(e)=>this.props.viewByClass(e.target.value)}/>Defender</div></td>
            <td><div><input value="Captain" type="radio" checked={(this.props.classView.indexOf("Captain") !== -1)} onChange={(e)=>this.props.viewByClass(e.target.value)}/>Captain</div></td>
            <td><div><input value="Witch" type="radio" checked={(this.props.classView.indexOf("Witch") !== -1)} onChange={(e)=>this.props.viewByClass(e.target.value)}/>Witch</div></td>
            </tr>
       
            </tbody>
            </table>
            
            </div>
        )
    }
}

