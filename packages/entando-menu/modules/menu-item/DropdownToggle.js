import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DropdownToggle extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();

    this.props.onClick(e);
  }

  render() {
    return (// eslint-disable-next-line
      <a
        href=""
        role={this.props.bsRole}
        onClick={this.handleClick}
        ref={(anchor) => { this.anchor = anchor; }}
      />
    );
  }
}

DropdownToggle.propTypes = {
  bsRole: PropTypes.oneOf(['toggle', 'menu']).isRequired,
  onClick: PropTypes.func,
};

DropdownToggle.defaultProps = {
  onClick: () => {},
};

export default DropdownToggle;
