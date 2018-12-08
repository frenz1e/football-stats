import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchTeamInfo, fetchTeamPlayers, setLeague } from '../actions/index'
import TeamInfo from '../components/team-info'
import TeamPlayers from '../components/team-players-table'
import { setBackButton } from '../actions/index'
import Loader from '../components/loader'

class Team extends Component {
  componentDidMount () {
    const { loading, params, teamInfo } = this.props
    const team = teamInfo[params.id]
    if (!team) this.props.dispatch(fetchTeamInfo(this.props.params.id))
    this.props.dispatch(setBackButton(true))
  }

  render () {
    const { loading, params, teamInfo } = this.props
    const team = teamInfo[params.id]
    return loading ? <Loader /> : team ? (
      <div className="page-team">
        <TeamInfo teamInfo={team} />
        <TeamPlayers teamPlayers={team.squad} />
      </div>
    ) : null
  }
}

const mapStateToProps = (state) => ({
  teamInfo: state.teamInfo,
  teamPlayers: state.teamPlayers,
  loading: state.loader.globalLoading,
  league: state.league
})

export default connect(mapStateToProps)(Team)
