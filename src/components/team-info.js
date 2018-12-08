import React from 'react'

const TeamInfo = (props) => {
  const { name, crestUrl, activeCompetitions = [] } = props.teamInfo

  return (
    <div className="text-center">
      <div className="team-image">
        <img src={crestUrl} />
      </div>
      <h1 className="team-name">{name}</h1>
      <h3 className="team-market-value">
        <span className="subtitle">Active competitions:</span>
        {activeCompetitions.map(({ name }) => name).join(', ')}
      </h3>
    </div>
  )
}

export default TeamInfo
