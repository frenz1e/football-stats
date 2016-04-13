import React from 'react';
import Loader from './loader';
import dateformat from 'dateformat';
import { Link } from 'react-router';
import { getTeamIdFromHref } from '../api';

const renderRow = (item, homeTeam, awayTeam) => {
	let result;
	
	switch (item.status) {
		case 'POSTPONED':
			result = <small>Postponed</small>;
			break;
		case 'FINISHED':
			result = 
				(item.result.goalsHomeTeam === null ? '-' : item.result.goalsHomeTeam)
				+ ' : ' + 
				(item.result.goalsAwayTeam === null ? '-' : item.result.goalsAwayTeam)
			break;
		case 'TIMED':
			const d = new Date(item.date);
			const minutes = ('0' + d.getMinutes()).slice(-2);
			const hours = ('0' + d.getHours()).slice(-2);
			result = `${hours} : ${minutes}`;
			break;
		case 'IN_PLAY':
			result = <div className="inplay">In Play</div>
			break;
		default:
			result = '- : -';
			break;
	}

	return (
		<div className="fixtures-row">
			<div className="fixtures-home-team">
				<Link to={`/team/${getTeamIdFromHref(item._links.homeTeam.href)}`}>
					<div className="team-badge">
						<div className="team-badge-name">
							{item.homeTeamName}
						</div>
						<div className="team-logo-holder">
							<img src={homeTeam && homeTeam.crestUrl} alt=""/>
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
				<Link to={`/team/${getTeamIdFromHref(item._links.awayTeam.href)}`}>
					<div className="team-badge">
						<div className="team-logo-holder">
							<img src={awayTeam && awayTeam.crestUrl} alt=""/>
						</div>
						<div className="team-badge-name">
							{item.awayTeamName}
						</div>
					</div>
				</Link>
			</div>
		</div>
	)
};

const LeagueFixtures = (props) => {
	let date = null;

	const fixtures = props.fixtures.map((item, index) => {
		const homeTeam = props.teams.find((team) => team.name === item.homeTeamName);
		const awayTeam = props.teams.find((team) => team.name === item.awayTeamName);
		
		const d = new Date(item.date.slice(0, 10));
		const dateTitle = (date === d.getTime()) ? '' : <div className="fixtures-date">{dateformat(d, 'dddd d mmm yyyy')}</div>;		
		date = (date === d) ? date : d.getTime();

		return (
			<div key={index + item.date}>
				{dateTitle}
				{renderRow(item, homeTeam, awayTeam)}
			</div>
		);
	});

	return fixtures.length ? <div>{fixtures}</div> : <Loader />;
}

export default LeagueFixtures;
