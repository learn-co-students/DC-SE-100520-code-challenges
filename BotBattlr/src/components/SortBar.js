import React from "react";
import { Dropdown, Radio } from "semantic-ui-react";

function SortBar(props) {
  const filter = [
    {
      key: "Support",
      value: "Support",
      text: "Support",
    },
    {
      key: "Medic",
      value: "Medic",
      text: "Medic",
    },
    {
      key: "Assault",
      value: "Assault",
      text: "Assault",
    },
    {
      key: "Defender",
      value: "Defender",
      text: "Defender",
    },
    {
      key: "Captain",
      value: "Captain",
      text: "Captain",
    },
    {
      key: "Witch",
      value: "Witch",
      text: "Witch",
    },
  ];
  return (
    <div>
      <div className="ui form">
        <div className="two fields">
          <div className="field">
            <label>Filter</label>
            <Dropdown
              placeholder="Class"
              multiple
              search
              selection
              name="filter"
              value={props.filter}
              options={filter}
              onChange={props.sortBarOnChange}
            />
          </div>
          <div className="field">
            <label>Sort</label>
            <div className="four fields">
              <div className="field">
                <Radio
                  label="Default"
                  name="sort"
                  value="id"
                  checked={props.sort === "id"}
                  onChange={props.sortBarOnChange}
                />
              </div>
              <div className="field">
                <Radio
                  label="Health"
                  name="sort"
                  value="health"
                  checked={props.sort === "health"}
                  onChange={props.sortBarOnChange}
                />
              </div>
              <div className="field">
                <Radio
                  label="Damage"
                  name="sort"
                  value="damage"
                  checked={props.sort === "damage"}
                  onChange={props.sortBarOnChange}
                />
              </div>
              <div className="field">
                <Radio
                  label="Armor"
                  name="sort"
                  value="armor"
                  checked={props.sort === "armor"}
                  onChange={props.sortBarOnChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SortBar;
