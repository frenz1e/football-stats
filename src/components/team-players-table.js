import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Flag from 'react-flags';
import Loader from './loader';
import PlayerPosition from './player-position';
import { getCode, calculateAge } from '../utils';

class PlayersTable extends Component {

  renderTableBody() {
    const players = this.props.teamPlayers;
    let table = null;

    if (players) {
      table = players.map(player => (
        <tr key={player.jerseyNumber + player.name + 1} className="data-table-row">
          <td key={player.jerseyNumber + player.name + 2}>
            <span className="player__number">{player.jerseyNumber}</span>
          </td>
          <td key={player.jerseyNumber + player.name + 3}>
            <PlayerPosition position={player.position} className="player__position" />
          </td>
          <td key={player.jerseyNumber + player.name + 4}>
            <span className="player__name">{player.name}</span>
          </td>
          <td key={player.jerseyNumber + player.name + 5} title={player.nationality}>
            <Flag
              name={getCode(player.nationality)}
              format="png"
              pngSize={24}
              shiny={true}
              basePath="/images"
              alt={getCode(player.nationality)}
            />
          </td>
          <td key={player.jerseyNumber + player.name + 6}>{calculateAge(player.dateOfBirth)}</td>
          <td key={player.jerseyNumber + player.name + 8}>{player.marketValue || '-'}</td>
        </tr>
      ));
    }

    return table;
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
              <th>Market value</th>
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
    );
  }

  render() {
    return this.props.teamPlayers ? this.renderTableLayout() : <Loader />;
  }
}

export default PlayersTable;
