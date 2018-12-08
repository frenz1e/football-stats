import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { getTeamId } from '../api'
import { fetchStandings } from '../actions/index'
import LeagueTable from '../components/league-table'
import _ from 'lodash'
class Table extends Component {
  state = {
    leagueId: ''
  }

  static getDerivedStateFromProps(props, state) {
    if (props.league.id && props.league.id !== state.leagueId) {
      props.dispatch(fetchStandings(props.league.id))
      return { leagueId: props.league.id }
    }
    return null
  }

  handleRowClick = team => {
    this.props.router.push(`/team/${team.id}`)
  }

  render() {
    return (
      <div className="page-tables">
        <LeagueTable table={this.props.table} handleRowClick={this.handleRowClick} loading={this.props.loading} />
      </div>
    )
  }

}

const mapStateToProps = (state) => ({
  league: state.league,
  loading: state.loader.globalLoading,
  table: state.table
})

export default withRouter(connect(mapStateToProps)(Table))
