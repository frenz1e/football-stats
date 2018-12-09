import React, { Component } from 'react'
import Loader from './loader'
import moment from 'moment'
import { Link } from 'react-router'
import { STATUSES } from '../api-consts'
import _ from 'lodash'

class LeagueFixtures extends Component {
  renderRow = row => {
    const { status, homeTeam, awayTeam, score } = row
    const { teams, onResultClick } = this.props
    let result
    let hasResult
    const matchScore =  `${_.get(score, 'fullTime.homeTeam', '-')} : ${_.get(score, 'fullTime.awayTeam', '-')}`
    switch (status) {
      case STATUSES.POSTPONED:
        result = <small>Postponed</small>
        break
      case STATUSES.FINISHED:
        result = matchScore
        hasResult = true
        break
      case STATUSES.PAUSED:
      case STATUSES.IN_PLAY:
        result = <div>{matchScore}<small className="inplay">in play</small></div>
        hasResult = true
        break
      default:
        result = '- : -'
        break
    }
    const homeImg = _.get(teams.find(({ team }) => team.id === homeTeam.id), 'team.crestUrl', '')
    const awayImg = _.get(teams.find(({ team }) => team.id === awayTeam.id), 'team.crestUrl', '')

    return (
      <div className="fixtures-row">
        <div className="fixtures-home-team">
          <Link to={`/team/${homeTeam.id}`}>
            <div className="team-badge">
              <div className="team-badge-name">
                {homeTeam.name}
              </div>
              <div className="team-logo-holder">
                {homeImg && <img src={homeImg} alt=""/>}
              </div>
            </div>
          </Link>
        </div>
        <div className="fixtures-result">
          <div className="fixtures-result-title">
            {result}
          </div>
        </div>
        <div className="fixtures-away-team">
          <Link to={`/team/${awayTeam.id}`}>
            <div className="team-badge">
              <div className="team-logo-holder">
                {awayImg && <img src={awayImg} alt=""/>}
              </div>
              <div className="team-badge-name">
                {awayTeam.name}
              </div>
            </div>
          </Link>
        </div>
      </div>
    )
  }

  render () {
    const { matchInfoVisible, matchInfo, data, loading } = this.props
    const rows = data.map(item => {
      const showTime = [STATUSES.IN_PLAY, STATUSES.PAUSED, STATUSES.SCHEDULED].indexOf(item.status) !== -1
      return (
        <div key={item.id}>
          <div className="fixtures-date">
            {moment(item.utcDate).format('DD MMM YYYY')}
            {showTime && <span className='fixture-time'>{moment(item.utcDate).format('HH:mm')}</span>}
          </div>
          {this.renderRow(item)}
        </div>
      )
    })

    return rows.length ? (
      <div>
        <div style={{ position: 'relative' }}>{loading && <Loader />}</div>
        {rows}
      </div>
    ) : <Loader />
  }
}

export default LeagueFixtures
