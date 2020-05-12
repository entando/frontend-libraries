import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

export const hasAccess = (requiredPermissions, userPermissions = []) => {
  if (!requiredPermissions) {
    return false;
  }

  if (Array.isArray(requiredPermissions)) {
    return requiredPermissions.some(singlePermission => userPermissions.includes(singlePermission));
  }
  return userPermissions.includes(requiredPermissions);
};

const PermissionCheck = ({
  children,
  page403,
  requiredPermissions,
  userPermissions,
}) => {
  const toRender = !hasAccess(requiredPermissions, userPermissions) ?
    page403 :
    children;

  return (
    <Fragment>
      {toRender}
    </Fragment>
  );
};

PermissionCheck.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  page403: PropTypes.node.isRequired,
  requiredPermissions: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  userPermissions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PermissionCheck;
