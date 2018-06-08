import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

const linkTitle = projectName => (
  <FormattedMessage
    id="menu.goToProject"
    defaultMessage="Go to {projectName}"
    values={{
      projectName,
    }}
  />
);

const fomatInlineMessage = (message, messageKey) => (
  linkTitle(message).props.values[messageKey]
);

const ProjectLink = props => (
  <li className="ProjectLink">
    <a href={props.projectLink} title={fomatInlineMessage(props.projectName, 'projectName')}>
      <i title="Help" className="fa fa-globe" />&nbsp;
      {linkTitle(props.projectName)}
    </a>
  </li>
);

export default ProjectLink;

ProjectLink.propTypes = {
  projectLink: PropTypes.string.isRequired,
  projectName: PropTypes.string.isRequired,
};
