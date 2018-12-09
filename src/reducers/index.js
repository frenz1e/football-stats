import _ from 'lodash'
import { filterLeagues } from '../api'

export function loader (state = {}, action) {
  switch (action.type) {
    case 'FETCH_STANDINGS_REQUEST':
    case 'FETCH_LEAGUES_REQUEST':
    case 'FETCH_RESULTS_REQUEST':
    case 'FETCH_SCHEDULED_REQUEST':
    case 'FETCH_TEAM_INFO_REQUEST':
      return { ...state, globalLoading: true }
    case 'FETCH_LEAGUES_SUCCESS':
    case 'FETCH_LEAGUES_ERROR':
    case 'FETCH_STANDINGS_SUCCESS':
    case 'FETCH_STANDINGS_ERROR':
    case 'FETCH_RESULTS_ERROR':
    case 'FETCH_RESULTS_SUCCESS':
    case 'FETCH_SCHEDULED_ERROR':
    case 'FETCH_SCHEDULED_SUCCESS':
    case 'FETCH_TEAM_INFO_SUCCESS':
    case 'FETCH_TEAM_INFO_ERROR':
      return { ...state, globalLoading: false }
    default:
      return state
  }
}

export function leagues (state = [], action) {
  switch (action.type) {
    case 'FETCH_LEAGUES_SUCCESS':
      return _.get(action, 'payload.competitions', []).filter(filterLeagues)
    default:
      return state
  }
}

export function teamInfo (state = {}, action) {
  switch (action.type) {
    case 'FETCH_TEAM_INFO_SUCCESS':
      return { ...state, [action.payload.team.id]: action.payload.team }
    default:
      return state
  }
}

export function teamPlayers (state = [], action) {
  switch (action.type) {
    case 'FETCH_TEAM_PLAYERS':
      return action.payload.data.players
    default:
      return state
  }
}

export function league (state = {}, action) {
  switch (action.type) {
    case 'SET_LEAGUE':
      return action.league || state
    default:
      return state
  }
}

export function backButton (state = false, action) {
  return (action.type === 'SET_BACKBUTTON') ? action.visibility : state
}

export function results (state = [], action) {
  switch (action.type) {
    case 'FETCH_RESULTS_SUCCESS':
      return action.payload.data.reverse()
    default:
      return state
  }
}

export function schedules (state = [], action) {
  switch (action.type) {
    case 'FETCH_SCHEDULED_SUCCESS':
      return action.payload.data
    default:
      return state
  }
}

export function teams (state = [], action) {
  switch (action.type) {
    case 'FETCH_TEAMS':
      return action.payload.data.teams
    default:
      return state
  }
}

export function standings (state = {}, action) {
  switch (action.type) {
    case 'FETCH_STANDINGS_SUCCESS':
      return action.payload
    default:
      return state
  }
}

export function table (state = [], action) {
  switch (action.type) {
    case 'FETCH_TABLE_SUCCESS':
      return (_.get(action.payload, 'standings', []).find(table => table.type === 'TOTAL') || {}).table
    default:
      return state
  }
}

export function matchInfo (state = {}, action) {
  switch (action.type) {
    case 'FETCH_MATCH_INFO_SUCCESS':
      return { ...state, [_.get(action.payload, 'data.match.id')]: action.payload.data }
    default:
      return state
  }
}

export function matchInfoVisible (state = [], { id, type }) {
  switch (type) {
    case 'TOGGLE_MATCH_INFO':
      let newState = [...state]
      if (state.indexOf(id) >= 0) {
        newState = newState.filter(el => el !== id)
      } else {
        newState.push(id)
      }
      return newState
    default:
      return state
  }
}