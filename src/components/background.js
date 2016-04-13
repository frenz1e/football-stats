import React, { Component } from 'react';
import ImageLoader from 'react-imageloader';

class AppBg extends Component {
  constructor() {
    super();

    this.state = {
      loaded: false
    };
  }

  render() {
    return (
      <div className="app-bg" style={{ opacity: this.state.loaded ? 1 : 0 }}>
        <ImageLoader
          src="/images/bg_main.jpg"
          onLoad={() => (this.setState({ loaded: true }))}
        >Image load failed!</ImageLoader>
      </div>
    );
  }
}

export default AppBg;
