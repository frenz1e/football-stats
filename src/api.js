import axios from 'axios';
import { API_URL, TOKEN, BING_KEY, strTeamReplace } from './api-consts.js';

function get(url) {
  return axios.get(API_URL + url,
    {
      headers: { 'X-Auth-Token': TOKEN },
      withCredentials: false
    }
  );
}

export function fetchLeagues() {
  return get(`competitions/?season=${(new Date()).getFullYear()}`);
}

export function filterLeagues(leagues) {
  const unwantedLeagues = [424, 428, 431, 432, 435, 437];
  return leagues.filter((league) => unwantedLeagues.indexOf(league.id) === -1)
  return leagues;
}

export function fetchTable(id) {
  return get(`competitions/${id}/leagueTable`);
}

export function fetchTeamInfo(id) {
  return get(`teams/${id}`);
}

export function fetchTeams(id) {
  return get(`competitions/${id}/teams`);
}

export function fetchTeamPlayers(id) {
  return get(`teams/${id}/players`);
}

export function getTeamId(team) {
  return team._links.team.href.replace(strTeamReplace, '');
}

export function getTeamIdFromHref(href) {
  return href.replace(strTeamReplace, '');
}

export function fetchPastFixtures(id) {
  return get(`/competitions/${id}/fixtures/?timeFrame=p14`);
}

export function fetchNextFixtures(id) {
  return get(`/competitions/${id}/fixtures/?timeFrame=n14`);
}

export function fetchBgImage(query) {
  let ImageFilters = [
    'Size:Large',
    'Style:Photo'
  ];

  ImageFilters = ImageFilters.join('%2B');

  return axios.get(`https://api.datamarket.azure.com/Bing/Search/Image?$format=json&Query='${query}'&ImageFilters='${ImageFilters}'&$top=1`,
    { headers: { Authorization: `Basic  ${BING_KEY}` } }
  );
}
