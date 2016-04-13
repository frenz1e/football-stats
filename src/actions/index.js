import * as API from '../api';

export function fetchLeagues() {
  const request = API.fetchLeagues();
  return {
    type: 'FETCH_LEAGUES',
    payload: request
  };
}

export function fetchTable(leagueId) {
  const request = API.fetchTable(leagueId);
  return {
    type: 'FETCH_TABLE',
    payload: request
  };
}

export function fetchTeams(seasonId) {
  const request = API.fetchTeams(seasonId);
  return {
    type: 'FETCH_TEAMS',
    payload: request
  };
}

export function fetchTeamInfo(id) {
  const request = API.fetchTeamInfo(id);
  return {
    type: 'FETCH_TEAM_INFO',
    payload: request
  };
}

export function fetchTeamPlayers(id) {
  const request = API.fetchTeamPlayers(id);
  return {
    type: 'FETCH_TEAM_PLAYERS',
    payload: request
  };
}

export function fetchBackground(query) {
  const request = API.fetchBgImage(query);
  return {
    type: 'FETCH_BACKGROUND',
    payload: request
  };
}

export function setBackButton(visibility) {
  return {
    type: 'SET_BACKBUTTON',
    visibility
  };
}

export function setLeague(league) {
  return {
    type: 'SET_LEAGUE',
    league
  };
}

export function fetchResults(id) {
  const request = API.fetchPastFixtures(id);
  return {
    type: 'FETCH_RESULTS',
    payload: request
  };
}

export function fetchFixtures(id) {
  const request = API.fetchNextFixtures(id);
  return {
    type: 'FETCH_FIXTURES',
    payload: request
  };
}
