import React from 'react';
import PropTypes from 'prop-types';


const ActivityStreamMenu = ({ onClickToggle }) => {
  const onClick = (ev) => {
    ev.preventDefault();
    onClickToggle();
  };
  return (
    <li className="ActivityStreamMenu drawer-pf-trigger">
      <a href="" className="nav-item-iconic" onClick={onClick}>
        <span className="fa fa-bell" title="Notifications" />
        <span className="badge badge-pf-bordered" />
      </a>
    </li>);
};

ActivityStreamMenu.propTypes = {
  onClickToggle: PropTypes.func,
};

ActivityStreamMenu.defaultProps = {
  onClickToggle: () => {},
};


export default ActivityStreamMenu;
