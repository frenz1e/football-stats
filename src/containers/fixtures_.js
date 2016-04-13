import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFixtures, fetchTable } from '../actions/index';
import LeagueFixtures from '../components/league-fixtures';

class Fixtures extends Component {

	constructor() {
		super();

		this.state = {
			leagueId: null && this.props.league.id
		}
	}

	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}

	componentDidMount() {
		const leagueId = this.props.league.id;
		if (leagueId && leagueId != this.state.leagueId) {
			this.setState({
				leagueId
			});
			//this.props.dispatch(fetchTeams())
			this.props.dispatch(fetchFixtures(leagueId, this.props.league.currentMatchday + 1));
		}
	}

	componentWillReceiveProps(nextProps) {
		const leagueId = nextProps.league.id;
		if (leagueId && leagueId != this.state.leagueId) {
			this.setState({
				leagueId
			});
			this.props.dispatch(fetchFixtures(leagueId, nextProps.league.currentMatchday + 1));
		}
	}

	render() {
		return (
			<LeagueFixtures fixtures={this.props.fixtures} />
		)
	}

}

const mapStateToProps = (state) => {
	return {
		league: state.league,
		fixtures: state.fixtures
	}
}

export default connect(mapStateToProps)(Fixtures);
