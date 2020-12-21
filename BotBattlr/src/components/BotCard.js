import React from "react";

const botTypeClasses = {
  Assault: "icon military",
  Defender: "icon shield",
  Support: "icon plus circle",
  Medic: "icon ambulance",
  Witch: "icon magic",
  Captain: "icon star",
};

const BotCard = ({ botsData, handleAddToArmy }) => {
  return (
    <div className="ui column">
      <div
        className="ui card"
        key={botsData.id}
        onClick={() => handleAddToArmy(botsData.id)}
      >
        <div className="image">
          <img alt="oh no!" src={botsData.avatar_url} />
        </div>
        <div className="content">
          <div className="header">
            {botsData.name}
            <i className={botTypeClasses[botsData.bot_class]} />
          </div>
          <div className="meta text-wrap">
            <small>{botsData.catchphrase}</small>
          </div>
        </div>
        <div className="extra content">
          <span>
            <i className="icon heartbeat" />
            {botsData.health}
          </span>

          <span>
            <i className="icon lightning" />
            {botsData.damage}
          </span>
          <span>
            <i className="icon shield" />
            {botsData.armor}
          </span>
          <span>
            <div className="ui center aligned segment basic">
              <button
                className="ui mini red button"
                onClick={() =>
                  console.log("add code to connect event listener")
                }
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
