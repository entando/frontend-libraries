import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';

import DropdownToggle from 'menu-item/DropdownToggle';

class DropdownMenuItem extends Component {
  constructor(props) {
    super(props);
    this.onClickAnchor = this.onClickAnchor.bind(this);
    this.ddToggle = {};
  }

  onClickAnchor(ev) {
    ev.preventDefault();
    this.props.onClick(ev);
    this.ddToggle.anchor.click(ev);
  }

  render() {
    const {
      id, active, pullRight, children, className, label, menuClassName,
    } = this.props;

    let liClassName = 'DropdownMenuItem';
    liClassName += className ? ` ${className}` : '';
    if (active) {
      liClassName += ' active';
    }
    if (pullRight) {
      liClassName += ' pull-right';
    }
    return (
      <li className={liClassName} data-id={id}>
        <a
          href=""
          onClick={this.onClickAnchor}
        >
          { label }
          &nbsp;
        </a>
        <Dropdown
          id={`${id}-dropdown`}
          pullRight={pullRight}
          style={{ position: 'static' }}
        >
          <DropdownToggle bsRole="toggle" ref={(el) => { this.ddToggle = el; }} />
          <Dropdown.Menu className={menuClassName}>
            { children }
          </Dropdown.Menu>
        </Dropdown>
      </li>
    );
  }
}


DropdownMenuItem.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  active: PropTypes.bool,
  pullRight: PropTypes.bool,
  menuClassName: PropTypes.string,
};

DropdownMenuItem.defaultProps = {
  pullRight: false,
  onClick: () => {},
  active: false,
  className: '',
  menuClassName: '',
};


export default DropdownMenuItem;
