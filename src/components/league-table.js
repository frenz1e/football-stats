import React, { Component } from 'react'
import Loader from './loader'
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class LeagueTable extends Component {
  renderTableBody () {
    const { table } = this.props
    return (
      table.map(({ team, ...item }) => (
        <tr key={team.id} className="data-table-row tr-link" onClick={() => this.props.handleRowClick(team)}>
          <td>
            <div className="team-logo-holder">
              <img src={team.crestUrl} alt="logo" />
            </div>
          </td>
          <td>{item.position}</td>
          <td>{team.name}</td>
          <td>{item.playedGames}</td>
          <td>{item.won}</td>
          <td>{item.draw}</td>
          <td>{item.lost}</td>
          <td>{item.goalDifference}</td>
          <td>{item.points}</td>
        </tr>
      ))
    )
  }

  renderTableLayout () {
    return (
      <div className="container">
        <div style={{position: 'relative'}}>{this.props.loading && <Loader />}</div>
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Pos</th>
              <th>Team</th>
              <th>P</th>
              <th>W</th>
              <th>D</th>
              <th>L</th>
              <th>GD</th>
              <th>PTS</th>
            </tr>
          </thead>
          <tbody>
            {/*          <ReactCSSTransitionGroup
                        component="tbody"
                        transitionName="data-table-row"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={300}
                        transitionAppear={true}
                        transitionAppearTimeout={500}
                      >
            */}
            { this.renderTableBody() }
            {/*
          </ReactCSSTransitionGroup>
*/}
          </tbody>
        </table>
      </div>
    )
  }

  render () {
    return this.props.table.length ? this.renderTableLayout() : <Loader />
  }
}

export default LeagueTable
