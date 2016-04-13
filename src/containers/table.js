import React, { Component } from 'react';
import LeagueTable from '../components/league-table';
import { connect } from 'react-redux';
import { getTeamId } from '../api';
import { fetchTable } from '../actions/index';
import _ from 'lodash';

class Table extends Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.state = {
      leagueId: null
    };
  }

  componentWillMount() {
    const leagueId = this.props.league.id;
    if (leagueId) {
      this.setState({ leagueId });
      this.props.dispatch(fetchTable(leagueId));
    }
  }

  componentWillReceiveProps(nextProps) {
    const leagueId = nextProps.league.id;

    if (leagueId && leagueId != this.state.leagueId) {
      this.setState({ leagueId });
      this.props.dispatch(fetchTable(leagueId));
    }
  }

  handleRowClick(item) {
    const id = getTeamId(item);
    this.context.router.push(`/team/${id}`);
  }

  render() {
    return (
      <div className="page-tables">
        <LeagueTable league={this.props.table} handleRowClick={this.handleRowClick} />
      </div>
    );
  }

}

const mapStateToProps = (state) => ({
  league: state.league,
  table: state.table
});

export default connect(mapStateToProps)(Table);
