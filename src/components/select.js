import React from 'react';

function renderSelect(items) {
  return ((items) ? items.map(item => (
      <option key={item.id} value={item.id}>
        {item.caption}
      </option>
  )) : <option value=""></option>);
}

export default (props) => {
  return <div className="select">
    <select onChange={props.onChange} value={props.value}>
      { renderSelect(props.items) }
    </select>
  </div>
};
