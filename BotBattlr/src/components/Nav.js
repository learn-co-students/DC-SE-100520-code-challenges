import React from "react";

export default function Nav(props) {
  return (
    <nav>
      <ul>
        <li value="All" onClick={props.setFilter}>
          All
        </li>
        &nbsp;&nbsp;
        <li value="Support" onClick={props.setFilter}>
          Support
        </li>
        &nbsp;&nbsp;
        <li value="Medic" onClick={props.setFilter}>
          Medic
        </li>
        &nbsp;&nbsp;
        <li value="Assault" onClick={props.setFilter}>
          Assault
        </li>
        &nbsp;&nbsp;
        <li value="Defender" onClick={props.setFilter}>
          Defender
        </li>
        &nbsp;&nbsp;
        <li value="Captain" onClick={props.setFilter}>
          Captain
        </li>
        &nbsp;&nbsp;
        <li value="Witch" onClick={props.setFilter}>
          Witch
        </li>
        &nbsp;&nbsp;
      </ul>
      <ul>
        <select onChange={props.sort}>
          <option value="id">All</option>
          <option value="health">Health</option>
          <option value="damage">Damage</option>
          <option value="armor">Armor</option>
        </select>
      </ul>
    </nav>
  );
}
