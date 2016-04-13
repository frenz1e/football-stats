import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTeamInfo, fetchTeamPlayers } from '../actions/index';
import TeamInfo from '../components/team-info';
import TeamPlayers from '../components/team-players-table';
import { fetchTable, setBackButton } from '../actions/index';

class Team extends Component {

  componentDidMount() {
    this.props.dispatch(fetchTeamInfo(this.props.params.id));
    this.props.dispatch(fetchTeamPlayers(this.props.params.id));
    this.props.dispatch(setBackButton(true));
  }

  render() {
    return (
      <div className="page-team">
        <TeamInfo teamInfo={this.props.teamInfo} />
        <TeamPlayers teamPlayers={this.props.teamPlayers} />
      </div>
    );
  }

}

const mapStateToProps = (state) => ({
  teamInfo: state.teamInfo,
  teamPlayers: state.teamPlayers
});

export default connect(mapStateToProps)(Team);
