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
  return get('soccerseasons/');
}

export function filterLeagues(leagues) {
  const baseLeagues = [394, 396, 398, 399, 401, 402, 404];
  return leagues.filter((league) => baseLeagues.indexOf(league.id) !== -1)
}

export function fetchTable(id) {
  return get(`soccerseasons/${id}/leagueTable`);
}

export function fetchTeamInfo(id) {
  return get(`teams/${id}`);
}

export function fetchTeams(id) {
  return get(`soccerseasons/${id}/teams`);
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
  return get(`/soccerseasons/${id}/fixtures/?timeFrame=p14`);
}

export function fetchNextFixtures(id) {
  return get(`/soccerseasons/${id}/fixtures/?timeFrame=n14`);
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
