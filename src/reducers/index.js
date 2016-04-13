export function leagues(state = [], action) {
  switch (action.type) {
    case 'FETCH_LEAGUES':
      return [...state, ...action.payload.data];
    default:
      return state;
  }
}

export function table(state = {}, action) {
  switch (action.type) {
    case 'FETCH_TABLE':
      return Object.assign({}, state, action.payload.data);
    default:
      return state;
  }
}

export function teamInfo(state = {}, action) {
  switch (action.type) {
    case 'FETCH_TEAM_INFO':
      return Object.assign({}, state, action.payload.data);
    default:
      return state;
  }
}

export function teamPlayers(state = [], action) {
  switch (action.type) {
    case 'FETCH_TEAM_PLAYERS':
      return action.payload.data.players;
    default:
      return state;
  }
}

export function league(state = {}, action) {
  switch (action.type) {
    case 'SET_LEAGUE':
      return Object.assign({}, state, action.league);
    default:
      return state;
  }
}

export function backButton(state = false, action) {
  return (action.type === 'SET_BACKBUTTON') ? action.visibility : state;
}

export function results(state = [], action) {
  switch (action.type) {
    case 'FETCH_RESULTS':
      return action.payload.data.fixtures.reverse();
    default: 
      return state;
  }
}

export function fixtures(state = [], action) {
  switch (action.type) {
    case 'FETCH_FIXTURES':
      return action.payload.data.fixtures;
    default: 
      return state;
  }
}

export function teams(state = [], action) {
  switch (action.type) {
    case 'FETCH_TEAMS':
      return action.payload.data.teams;
    default: 
      return state;
  }
}


