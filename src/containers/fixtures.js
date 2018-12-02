import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { fetchResults, fetchFixtures, fetchTeams } from '../actions/index';
import LeagueFixtures from '../components/league-fixtures';

class Results extends Component {

  constructor(props) {
    super(props);

    this.state = {
      leagueId: null
    }
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  fetchData(leagueId) {
    if (this.props.route.name === 'results') {
      this.props.dispatch(fetchResults(leagueId));
    } else {
      this.props.dispatch(fetchFixtures(leagueId));
    }
  }

  componentDidMount() {
    const leagueId = this.props.league.id;
    if (leagueId && leagueId != this.state.leagueId) {
      this.setState({
        leagueId
      });
      this.props.dispatch(fetchTeams(leagueId));
      this.fetchData(leagueId);
    }
  }

  componentWillReceiveProps(nextProps) {
    const leagueId = nextProps.league.id;
    if (leagueId && leagueId != this.state.leagueId) {
      this.setState({
        leagueId
      });
      this.props.dispatch(fetchTeams(leagueId));
      this.fetchData(leagueId);
    }
    if (leagueId && this.props.route.name !== nextProps.route.name) {
      if (nextProps.route.name === 'results') {
        this.props.dispatch(fetchResults(leagueId));
      } else {
        this.props.dispatch(fetchFixtures(leagueId));
      }
    }
  }

  render() {
    const fixtures = this.props.route.name === 'results' ? this.props.results : this.props.fixtures;
    return (
      <LeagueFixtures fixtures={fixtures} teams={this.props.teams} />
    )
  }

}

const mapStateToProps = (state) => {
  return {
    league: state.league,
    results: state.results,
    teams: state.teams,
    fixtures: state.fixtures
  }
}

export default connect(mapStateToProps)(Results);
