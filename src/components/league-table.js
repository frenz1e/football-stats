import React, { Component } from 'react';
import Loader from './loader';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class LeagueTable extends Component {

  renderTableBody() {
    const leagueStanding = this.props.league.standing;
    let table = null;

    if (leagueStanding) {
      table = leagueStanding.map(item => (
        <tr key={item.crestURI} className="data-table-row tr-link" onClick={() => this.props.handleRowClick(item)}>
          <td key={item.crestURI + 1}>
            <div key={`${item.crestURI} img-wrap`} className="team-logo-holder">
              <img key={`${item.crestURI} img`} src={item.crestURI} alt="logo" />
            </div>
          </td>
          <td key={item.crestURI + 2}>{item.position}</td>
          <td key={item.crestURI + 3}>{item.teamName}</td>
          <td key={item.crestURI + 8}>{item.playedGames}</td>
          <td key={item.crestURI + 4}>{item.wins}</td>
          <td key={item.crestURI + 5}>{item.draws}</td>
          <td key={item.crestURI + 6}>{item.losses}</td>
          <td key={item.crestURI + 7}>{item.goalDifference}</td>
          <td key={item.crestURI + 9}>{item.points}</td>
        </tr>
      ));
    }

    return table;
  }

  renderTableLayout() {
    return (
      <div className="container">
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
    );
  }

  render() {
    return this.props.league.leagueCaption ? this.renderTableLayout() : <Loader />;
  }
}


export default LeagueTable;
