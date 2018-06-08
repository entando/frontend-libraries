import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

class ActivityStream extends Component {
  constructor(props) {
    super(props);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.onClickClose = this.onClickClose.bind(this);
    this.state = { addClass: false };
  }

  onClickClose(ev) {
    ev.preventDefault();
    this.props.closeDrawer();
  }
  toggleDrawer(ev) {
    ev.preventDefault();
    this.setState({ addClass: !this.state.addClass });
  }

  render() {
    const { hidden } = this.props;
    let reverseButton = 'drawer-pf-toggle-expand fa fa-angle-double-left hidden-xs';
    const drawerClass = ['drawer-pf drawer-pf-notifications-non-clickable'];

    if (this.state.addClass) {
      reverseButton = 'drawer-pf-toggle-expand fa fa-angle-double-right hidden-xs';
      drawerClass.push('drawer-pf-expanded');
    }
    if (hidden) {
      drawerClass.push('hide');
    }
    return (
      <div className="ActivityStream">
        <div className={drawerClass.join(' ').trim()}>
          <div className="drawer-pf-title">
            <a
              href=""
              className={reverseButton}
              onClick={this.toggleDrawer}
            >
              &nbsp;
            </a>
            <a
              href=""
              className="drawer-pf-close pficon pficon-close"
              onClick={this.onClickClose}
            >
              &nbsp;
            </a>
            <h3 className="text-center">
              <FormattedMessage
                id="fcc.activityStream.drawer"
              />
            </h3>
          </div>
          <div className="ActivityStream__container panel-group">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

ActivityStream.propTypes = {
  closeDrawer: PropTypes.func,
  hidden: PropTypes.bool,
  children: PropTypes.node,
};

ActivityStream.defaultProps = {
  closeDrawer: () => {},
  hidden: true,
  children: null,
};

export default ActivityStream;
