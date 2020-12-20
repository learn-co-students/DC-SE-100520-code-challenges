import React, { Component } from 'react'

export default class SortBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sort: "none",
            filters: []
        }
    }

    doTheFilter = (array, filter) =>{
        return array.filter(bot => bot.bot_class === filter);
    } 

    sortAndFilterBots = () => {
        let sortedBots = this.props.bot
        let filteredBots = []
        this.state.filters.forEach(filter => {
            filteredBots = filteredBots.concat(this.doTheFilter(this.props.bots, filter))
        });
        sortedBots = filteredBots;
        if(this.state.filters.length === 0)sortedBots = this.props.bots;
        switch(this.state.sort){
            case "health":
                sortedBots = sortedBots.sort((botA, botB) => this.compare(botB.health, botA.health));
                break;
            case "armor":
                sortedBots = sortedBots.sort((botA, botB) => this.compare(botB.armor, botA.armor));
                break;
            case "damage":
                sortedBots = sortedBots.sort((botA, botB) => this.compare(botB.damage, botA.damage));
                break;
            default: 
                console.log(sortedBots);
        }
        this.props.setBots(sortedBots);
    }

    updateSort = (e) => {
        this.setState({sort: e.target.value}, this.sortAndFilterBots);
    }

    updateFilters = (e) => {
        const theFilters = this.state.filters.filter(filter => !(filter === e.target.value));
        if(!this.state.filters.includes(e.target.value)) this.setState({filters: [...this.state.filters, e.target.value]}, this.sortAndFilterBots);
        else this.setState({filters: theFilters},this.sortAndFilterBots);
    }

    compare(a, b){
        return (a > b ? 1 : (a < b ? -1 : 0))
    }

    render() {
        return (
            <div>
                <h3>Sort Em</h3>
                <input onChange={this.updateSort} id="healthSort" type="radio" name="sort" value="health" />
                <label htmlFor="healthSort">Health</label><br/>
                <input onChange={this.updateSort} id="damageSort" type="radio" name="sort" value="damage" />
                <label htmlFor="damageSort">Damage</label><br/>
                <input onChange={this.updateSort} id="armorSort" type="radio" name="sort" value="armor" />
                <label htmlFor="armorSort">Armor</label><br/>
                < input onChange={this.updateFilters} type="checkbox"  id="support" value="Support"/>
                <label htmlFor="support"> Support </label>
                < input onChange={this.updateFilters} type="checkbox"  id="medic" value="Medic"/>
                <label htmlFor="medic"> Medic </label>
                < input onChange={this.updateFilters} type="checkbox"  id="witch" value="Witch"/>
                <label htmlFor="witch"> Witch </label>
                < input onChange={this.updateFilters} type="checkbox"  id="assault" value="Assault"/>
                <label htmlFor="assault"> Assault </label>
                < input onChange={this.updateFilters} type="checkbox"  id="defender" value="Defender"/>
                <label htmlFor="defender"> Defender </label>
                < input onChange={this.updateFilters} type="checkbox" id="captain" value="Captain" />
                <label htmlFor="captain"> Captain </label>
            </div>
        )
    }
}
