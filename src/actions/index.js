import * as API from '../api'
import _ from 'lodash'
import moment from 'moment'
import { DATE_FORMAT, STATUSES } from '../api-consts'
const showError = err => console.error(err)

export function fetchLeagues (leagueName) {
  return async dispatch => {
    try {
      dispatch({ type: 'FETCH_ALL_LEAGUES_REQUEST' })
      const resp = await API.fetchLeagues()
      dispatch({ type: 'FETCH_LEAGUES_SUCCESS', payload: resp })
      const { competitions } = resp
      if (competitions) {
        const league = competitions.find(c => c.code === leagueName)
        dispatch(setLeague(league))
      }
    } catch (error) {
      showError(error)
      dispatch({ type: 'FETCH_LEAGUES_ERROR', payload: error })
    }
  }
}

export function fetchStandings (leagueId) {
  return async dispatch => {
    try {
      dispatch({ type: 'FETCH_STANDINGS_REQUEST' })
      const resp = await API.fetchStandings(leagueId)
      dispatch({ type: 'FETCH_STANDINGS_SUCCESS', payload: resp })
      dispatch({ type: 'FETCH_TABLE_SUCCESS', payload: resp })
    } catch (err) {
      showError(err)
      dispatch({ type: 'FETCH_STANDINGS_ERROR', payload: err })
    }
  }
}

export function fetchTeamInfo (id) {
  return async dispatch => {
    try {
      dispatch({ type: 'FETCH_TEAM_INFO_REQUEST' })
      const team = await API.fetchTeamInfo(id)
      dispatch({ type: 'FETCH_TEAM_INFO_SUCCESS', payload: { team } })
    } catch (error) {
      console.error(error)
      dispatch({ type: 'FETCH_TEAM_INFO_ERROR', payload: { error } })
    }
  }
}

export function fetchTeamPlayers (id) {
  return async dispatch => {
    const data = await API.fetchTeamPlayers(id)
    return {
      type: 'FETCH_TEAM_PLAYERS',
      payload: data
    }
  }
}

export function fetchBackground (query) {
  return async dispatch => {
    const data = await API.fetchBgImage(query)
    return {
      type: 'FETCH_BACKGROUND',
      payload: data
    }
  }
}

export function setBackButton (visibility) {
  return {
    type: 'SET_BACKBUTTON',
    visibility
  }
}

export function setLeague (league) {
  return {
    type: 'SET_LEAGUE',
    league
  }
}

export function fetchResults (league = {}) {
  return async (dispatch, getState) => {
    try {
      const { standings } = getState()
      if (_.get(standings, 'competition.id') !== league.id) {
        dispatch(fetchStandings(league.id))
      }
      dispatch({ type: 'FETCH_RESULTS_REQUEST' })
      const result = await API.matchesInRange(
        league.id,
        moment().subtract(7, 'days').format(DATE_FORMAT),
        moment().format(DATE_FORMAT)
      )
      const payload = {
        data: result.matches.reduce((prev, next) => next.status !== STATUSES.SCHEDULED ? [...prev, next] : prev, [])
      }
      dispatch({ type: 'FETCH_RESULTS_SUCCESS', payload })
    } catch (err) {
      dispatch({ type: 'FETCH_RESULTS_ERROR', payload: err })
      console.error(err)
    }
  }
}

export function fetchSchedules (league = {}) {
  return async (dispatch, getState) => {
    try {
      const { standings } = getState()
      if (_.get(standings, 'competition.id') !== league.id) {
        dispatch(fetchStandings(league.id))
      }
      dispatch({ type: 'FETCH_SCHEDULED_REQUEST' })
      const result = await API.matchesInRange(
        league.id,
        moment().format(DATE_FORMAT),
        moment().add(7, 'days').format(DATE_FORMAT)
      )
      const payload = {
        data: result.matches.reduce((prev, next) =>
          next.status === STATUSES.SCHEDULED ? [...prev, next] : prev, [])
          .sort((a, b) => a.utcDate > b.utcDate ? 1 : a.utcDate < b.utcDate ? -1 : 0)
      }
      dispatch({ type: 'FETCH_SCHEDULED_SUCCESS', payload })
    } catch (err) {
      dispatch({ type: 'FETCH_SCHEDULED_ERROR', payload: err })
      console.error(err)
    }
  }
}
