import React from 'react'
import { connect } from 'react-redux'
import { fetchLeagues, setLeague, setBackButton } from '../actions/index'
import MainNav from '../components/main-nav'
import { withRouter } from 'react-router'
import _ from 'lodash'

class Nav extends React.Component {
  componentDidMount () {
    const leagueName = this.props.params.leagueName
    this.props.dispatch(fetchLeagues(leagueName))
  }

  onSelectChange = e => {
    const leagues = this.props.leagues
    const id = e.target.value
    const league = leagues.find(l => l.id == id)
    this.props.dispatch(setLeague(league))
    const routeName = _.last(this.props.routes).name
    this.props.router.push(`/${league.code}/${routeName}`)
  }

  onBackButtonClick = () => {
    if (this.props.league.id) {
      this.props.router.goBack()
      this.props.dispatch(setBackButton(false))
    } else {
      window.location.href = '/'
    }
  }

  render() {
    const extraClass = this.props.backButton ? ' show-back' : ''
    const { leagues } = this.props
    return (
      <MainNav
        extraClass={extraClass}
        onBackButtonClick={this.onBackButtonClick}
        onSelectChange={this.onSelectChange}
        leagues={leagues}
        league={this.props.league}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  leagues: state.leagues,
  league: state.league,
  backButton: state.backButton
})

export default withRouter(connect(mapStateToProps)(Nav))
