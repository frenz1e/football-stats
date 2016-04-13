import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from '../components/layout';
import { setLeague } from '../actions/index';

class League extends Component {
  componentWillMount() {
    this.props.dispatch(setLeague(this.props.league || this.props.params.league));
  }

  render() {
    return (
      <Layout children={this.props.children} />
    );
  }
}

export default connect(state => ({ league: state.league }))(League);
