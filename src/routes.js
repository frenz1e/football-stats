import React from 'react';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
// import League from './containers/league';
import App from './components/app';
import Table from './containers/table';
import Team from './containers/team';
import Fixtures from './containers/fixtures';
import NoMatch from './components/no-match';

const Routes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
    	<IndexRedirect to="/BL1/table" />
      <Route name="table" path=":leagueName/table" component={Table} />
      <Route name="results" path=":leagueName/results" component={Fixtures} />
      <Route name="fixtures" path=":leagueName/fixtures" component={Fixtures} />
      <Route name="team" path="team/:id" component={Team} />
      <Route path="*" component={NoMatch} />
    </Route>
  </Router>
);

export default Routes;