import React from 'react';

import { OverlayTrigger, Popover } from 'patternfly-react';

import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import 'HelpMenu.scss';

const HELP_TEXT_PROPERTY = 'menu.help.text';

const popover = () => (
  <Popover id="popover-admin-app-switch" title="">
    <p>
      <FormattedMessage id={HELP_TEXT_PROPERTY} defaultMessage="Help" />
    </p>
  </Popover>
);


const HelpMenu = ({ placement }) => (
  <li className="HelpMenu">
    <a href="#">
      <OverlayTrigger
        overlay={popover()}
        placement={placement}
        trigger={['click']}
        rootClose
      >
        <i className="HelpMenu__i fa pficon-help" />
      </OverlayTrigger>
    </a>
  </li>
);

HelpMenu.propTypes = {
  placement: PropTypes.oneOf(['left', 'top', 'bottom', 'right']),
};

HelpMenu.defaultProps = {
  placement: 'bottom',
};

export default HelpMenu;
