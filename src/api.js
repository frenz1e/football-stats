import { API_URL, TOKEN, BING_KEY, strTeamReplace, LEAGUES, STATUSES } from './api-consts'

async function get (url) {
  return fetch(API_URL + url, {
    headers: {
      'X-Auth-Token': TOKEN,
    }
  }).then(resp => resp.json()).then(data => data)
}

export function fetchLeagues () {
  return get(`competitions`)
}

export function filterLeagues (league = {}) {
  return league.code && LEAGUES.find(code => code === league.code)
}

export function fetchStandings (id) {
  return get(`competitions/${id}/standings`)
}

export function fetchTeamInfo (id) {
  return get(`teams/${id}`)
}

export function fetchTeams (id) {
  return get(`competitions/${id}/teams`)
}

export function fetchTeamPlayers (id) {
  return get(`teams/${id}/players`)
}

export function getTeamId (team) {
  return team._links.team.href.replace(strTeamReplace, '')
}

export function getTeamIdFromHref (href) {
  return href.replace(strTeamReplace, '')
}

export function matchesInRange (id, dateFrom, dateTo) {
  return get(`/competitions/${id}/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`)
}

export function fetchFinished (id, day) {
  return get(`/competitions/${id}/matches?status=${STATUSES.FINISHED}&matchday=${day}`)
}

export function fetchInPlay (id, day) {
  return get(`/competitions/${id}/matches?status=${STATUSES.IN_PLAY}&matchday=${day}`)
}

export function fetchScheduled (id, day) {
  return get(`/competitions/${id}/matches?status=${STATUSES.SCHEDULED}&matchday=${day}`)
}

export function fetchBgImage (query) {
  let ImageFilters = [
    'Size:Large',
    'Style:Photo'
  ]

  ImageFilters = ImageFilters.join('%2B')

  // return axios.get(`https://api.datamarket.azure.com/Bing/Search/Image?$format=json&Query='${query}'&ImageFilters='${ImageFilters}'&$top=1`,
  //   { headers: { Authorization: `Basic  ${BING_KEY}` } }
  // )
}
