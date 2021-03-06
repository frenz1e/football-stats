import React from 'react'
import AppBackground from './background'
import Navigation from '../containers/navigation'
import '../sass/common.sass'

export default (props) => (
  <div>
    <AppBackground />
    <div className='main-layout'>
      <header className='main-header'>
        Football Stats
        <a href='https://github.com/frenz1e/football-stats' className='github-link' />
      </header>
      <Navigation {...props} />
      <div className='page'>
        {props.children}
      </div>
    </div>
  </div>
)
