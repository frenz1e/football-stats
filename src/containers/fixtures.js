import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchResults, fetchSchedules } from '../actions/index'
import LeagueFixtures from '../components/league-fixtures'
import { withRouter } from 'react-router'

class Results extends Component {
  state = {
    leagueId: '',
    type: '',
  }

  static getDerivedStateFromProps(props, state) {
    const { dispatch, route, league } = props
    if (league.id && (league.id !== state.leagueId || route.name !== state.type)) {
      if (route.name === 'results') {
        dispatch(fetchResults(league))
      } else if (route.name === 'fixtures') {
        dispatch(fetchSchedules(league))
      }
      return { leagueId: league.id, type: route.name }
    }
    return null
  }

  render () {
    const data = this.props.route.name === 'results' ? this.props.results : this.props.schedules
    return (
      <LeagueFixtures data={data} teams={this.props.table} loading={this.props.loading}/>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loader.globalLoading,
    league: state.league,
    results: state.results,
    table: state.table,
    schedules: state.schedules
  }
}

export default withRouter(connect(mapStateToProps)(Results))
