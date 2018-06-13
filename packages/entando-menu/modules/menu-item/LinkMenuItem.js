import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@entando/router';

const LinkMenuItem = ({
  id, label, active, route, params, searchParams, className, onClick, pullRight,
}) => {
  let liClassName = 'LinkMenuItem';
  liClassName += className ? ` ${className}` : '';
  if (pullRight) {
    liClassName += ' pull-right';
  }
  if (active) {
    liClassName += ' active';
  }
  return (
    <li key={route} className={liClassName} data-id={id}>
      <Link
        onClick={onClick}
        route={route}
        params={params}
        searchParams={searchParams}
      >
        { label }
      </Link>
    </li>
  );
};


LinkMenuItem.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
  active: PropTypes.bool,
  className: PropTypes.string,
  pullRight: PropTypes.bool,
  onClick: PropTypes.func,
  route: PropTypes.string.isRequired,
  params: PropTypes.objectOf(PropTypes.string.isRequired),
  searchParams: PropTypes.objectOf(PropTypes.string.isRequired),
};

LinkMenuItem.defaultProps = {
  active: false,
  className: '',
  onClick: () => {},
  params: {},
  searchParams: {},
  pullRight: false,
};


export default LinkMenuItem;
