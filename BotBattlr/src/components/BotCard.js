import React from "react";

const botTypeClasses = {
  Assault: "icon military",
  Defender: "icon shield",
  Support: "icon plus circle",
  Medic: "icon ambulance",
  Witch: "icon magic",
  Captain: "icon star"
};

const BotCard = ({botData, clickAction, handleClick }) => {
  return (
    <div className="ui column">
      <div
        className="ui card"
        key={botData.id}
        onClick={() => clickAction(botData)}
        //() onClick fires addBot function which takes in
        //our botData as an argument
      >
        <div className="image">
          <img alt="oh no!" src={botData.avatar_url} />
        </div>
        <div className="content">
          <div className="header">
            {botData.name}
            <i className={botTypeClasses[botData.bot_class]} />
          </div>
          <div className="meta text-wrap">
            <small>{botData.catchphrase}</small>
          </div>
        </div>
        <div className="extra content">
          <span>
            <i className="icon heartbeat" />
            {botData.health}
          </span>

          <span>
            <i className="icon lightning" />
            {botData.damage}
          </span>
          <span>
            <i className="icon shield" />
            {botData.armor}
          </span>
          <span>
            <div className="ui center aligned segment basic">
              <button
                className="ui mini red button"
                key={botData.id}
                onClick={(e) => handleClick(botData.id)} 
              >
                x
              </button>
            </div>
          </span>
        </div>
      </div>
    </div>
  );
};

export default BotCard;
