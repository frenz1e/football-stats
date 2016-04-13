import React from 'react';

const loaderStyles = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)'
};

const Loader = () => (
	<div style={loaderStyles}>
    <div className="spinner">
      <div className="double-bounce1"></div>
      <div className="double-bounce2"></div>
    </div>
  </div>
);

export default Loader;
