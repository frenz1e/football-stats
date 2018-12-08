import React from 'react'
import { Link } from 'react-router'
import Select from '../components/select.js'

const MainNav = (props) => (
  <nav className={`main-nav ${props.extraClass}`}>
    <div className="main-link-back">
      <a className="link-back" onClick={props.onBackButtonClick}>
        <img src="/images/arr-l.svg" />
        Back
      </a>
    </div>
    <div className="main-menu" style={{opacity: props.leagues.length ? 1 : 0}}>
      <Select items={props.leagues} onChange={props.onSelectChange} value={props.league.id} />
      <div className="main-menu--submenu">
        <Link to={`/${props.league.code}/table`} activeClassName="active">Table</Link>
        <Link to={`/${props.league.code}/results`} activeClassName="active">Results</Link>
        <Link to={`/${props.league.code}/fixtures`} activeClassName="active">Fixtures</Link>
      </div>
    </div>
  </nav>
)

export default MainNav
