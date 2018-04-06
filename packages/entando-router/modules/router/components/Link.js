import React from 'react';
import PropTypes from 'prop-types';
import { omit } from 'lodash';

import { gotoPath, routeToPath } from '../router';

const Link = (props) => {
  const {
    children, route, params, searchParams, replace, onClick,
  } = props;
  const href = routeToPath(route, params, searchParams);
  return (
    <a
      {...omit(props, ['route', 'params', 'searchParams', 'replace'])}
      href={href}
      data-route={route}
      onClick={(e) => {
          e.preventDefault();
          onClick();
          gotoPath(replace ? 'replace' : 'push', href);
         }}
    >
      { children }
    </a>
  );
};

Link.propTypes = {
  route: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  params: PropTypes.objectOf(PropTypes.string),
  searchParams: PropTypes.objectOf(PropTypes.string),
  replace: PropTypes.bool,
  onClick: PropTypes.func,
};

Link.defaultProps = {
  params: {},
  searchParams: {},
  replace: false,
  onClick: () => {},
};

export default Link;
