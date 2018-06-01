import React from 'react';
import PropTypes from 'prop-types';
import { NavDropdown } from 'react-bootstrap';
import { Icon } from 'patternfly-react';

const UserDropdown = ({ userName, children }) => {
  const title = (
    <span>
      <Icon name="user" /> { userName }
    </span>
  );

  return (
    <NavDropdown id="UserDropdown" className="UserDropdown" title={title}>
      { children }
    </NavDropdown>
  );
};

UserDropdown.propTypes = {
  userName: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

UserDropdown.defaultProps = {
  children: null,
};

export default UserDropdown;
