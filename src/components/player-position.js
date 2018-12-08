import React from 'react';

function positionIcon(position) {
  const icon = {};

  icon.title = position;
  icon.label = position.replace(/-/g, ' ').match(/\b\w/g).join('');
  icon.color = (function () {
    let bgColor = '#fff';
    const position_ = position.toLowerCase().trim();

    if (position_ === 'goalkeeper') {
      bgColor = '#f68b39';
    } else if (position_.indexOf('defender') !== -1) {
      bgColor = '#42afe3';
    } else if (position_.indexOf('midfield') !== -1) {
      bgColor = '#97cd76';
    } else {
      bgColor = '#ed6c63';
    }
    return bgColor;
  }());

  return icon;
}

const Position = (props) => {
  const position_ = positionIcon(props.position);

  return (
    <div
      className={props.className || 'position-icon'}
      style={{ background: position_.color, color: '#fff' }}
      title={position_.title}
    >
      {position_.label}
    </div>
  );
};


export default Position;
