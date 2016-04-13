import React from 'react';

const TeamInfo = (props) => {
  const { name, crestUrl, squadMarketValue } = props.teamInfo;

  return (
    <div className="text-center">
      <div className="team-image">
        <img src={crestUrl} />
      </div>
      <h1 className="team-name">{name}</h1>
      <h3 className="team-market-value">
        <span className="subtitle">Squad Market value:</span>
        {squadMarketValue}
      </h3>
    </div>
  );
};

export default TeamInfo;
