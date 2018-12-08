import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Flag from 'react-flags'
import Loader from './loader'
import PlayerPosition from './player-position'
import { getCode, calculateAge } from '../utils'
import { registerLocale, getAlpha2Code } from 'i18n-iso-countries'

class PlayersTable extends Component {
  componentDidMount () {
    registerLocale(require("i18n-iso-countries/langs/en.json"))
  }

  renderTableBody () {
    return (this.props.teamPlayers || []).map(player => {
      let country = player.nationality || player.countryOfBirth
      if (country === 'United States') country = 'United States of America'
      if (country === 'England') country = 'United Kingdom'
      const code = getAlpha2Code(country, 'en')
      return player.position && (
        <tr key={player.id} className="data-table-row">
          <td>
            <span className="player__number">{player.shirtNumber}</span>
          </td>
          <td>
            <PlayerPosition position={player.position} className="player__position" />
          </td>
          <td>
            <span className="player__name">{player.name}</span>
          </td>
          <td title={player.nationality || player.countryOfBirth}>
            {code ? <Flag
              name={code || ''}
              format="png"
              pngSize={24}
              shiny={true}
              basePath="/images"
            /> : player.nationality || player.countryOfBirth}
          </td>
          <td>{calculateAge(player.dateOfBirth)}</td>
        </tr>
      )
    }).filter(Boolean)
  }

  renderTableLayout() {
    return (
      <div className="container">
        <table className="table table_team-players">
          <thead>
            <tr>
              <th>Number</th>
              <th>Position</th>
              <th>Player Name</th>
              <th>Nat.</th>
              <th>Age</th>
            </tr>
          </thead>
          <ReactCSSTransitionGroup
            component="tbody"
            transitionName="data-table-row"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
            transitionAppear={true}
            transitionAppearTimeout={500}
          >
            { this.renderTableBody() }
          </ReactCSSTransitionGroup>
        </table>
      </div>
    )
  }

  render() {
    return this.props.teamPlayers ? this.renderTableLayout() : <Loader />
  }
}

export default PlayersTable
