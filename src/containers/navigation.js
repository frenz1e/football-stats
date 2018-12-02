import React from 'react';
import { connect } from 'react-redux';
import { fetchLeagues, setLeague, setBackButton } from '../actions/index';
import MainNav from '../components/main-nav';
import { filterLeagues } from '../api';
import _ from 'lodash';
import { getLeagueByShortName, getLeagueById } from '../utils';
import PropTypes from 'prop-types'

class Nav extends React.Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      leagueShortName: ''
    };
    this.onBackButtonClick = this.onBackButtonClick.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
  }

  componentWillMount() {
    if (!this.props.leagues.length) {
      this.props.dispatch(fetchLeagues());
    }
  }

  componentWillReceiveProps(nextProps) {
    const leagues = nextProps.leagues;
    const leagueShortName = nextProps.params.leagueName;
    // after receive leagues
    if (nextProps.params.leagueName && nextProps.backButton) {
      this.props.dispatch(setBackButton(false));
    }

    if (leagues.length) {
      if (leagueShortName && leagueShortName != this.state.leagueShortName) {
        this.setState({ leagueShortName });
        this.props.dispatch(setLeague(getLeagueByShortName(leagueShortName, leagues)));
      }
    }
  }

  onSelectChange(event) {
    const leagues = this.props.leagues;
    const leagueId = event.target.value;
    const league = getLeagueById(leagueId, leagues);
    const routeName = _.last(this.props.routes).name;
    this.context.router.push(`/${league.league}/${routeName}`);
  }

  onBackButtonClick(event) {
    this.context.router.goBack();
    this.props.dispatch(setBackButton(false));
  }

  setComponentsLeague(league) {
  }

  render() {
    const extraClass = this.props.backButton ? ' show-back' : '';
    const leagues = filterLeagues(this.props.leagues);
    return (
      <MainNav
        extraClass={extraClass}
        onBackButtonClick={this.onBackButtonClick}
        onSelectChange={this.onSelectChange}
        leagues={leagues}
        league={this.props.league}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  leagues: state.leagues,
  league: state.league,
  backButton: state.backButton
});

export default connect(mapStateToProps)(Nav);
