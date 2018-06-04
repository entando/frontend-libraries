import React from 'react';

import PropTypes from 'prop-types';

import { OverlayTrigger, Popover } from 'patternfly-react';

import 'AdminAppSwitch.scss';

const popover = () => (
  <Popover id="popover-admin-app-switch" title="">
    <ul className="AdminAppSwitch__ul">
      <li className="AdminAppSwitch__li">
        <a className="AdminAppSwitch__a" href="#">DesingTime</a>
      </li>
      <li className="AdminAppSwitch__li">
        <a className="AdminAppSwitch__a" href="#">RunTime</a>
      </li>
    </ul>
  </Popover>
);


const AdminAppSwitch = ({ placement }) => (
  <li className="AdminAppSwitch">
    <a href="#">
      <OverlayTrigger
        overlay={popover()}
        placement={placement}
        trigger={['click']}
        rootClose
      >
        <i className="AdminAppSwitch__i fa fa-th" />
      </OverlayTrigger>
    </a>
  </li>
);

AdminAppSwitch.propTypes = {
  placement: PropTypes.oneOf(['left', 'top', 'bottom', 'right']),
};

AdminAppSwitch.defaultProps = {
  placement: 'bottom',
};

export default AdminAppSwitch;
