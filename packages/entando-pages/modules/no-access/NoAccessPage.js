import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Grid, Row, Col, Button } from 'patternfly-react';

const NOACCESS_TITLE = 'fl.pages.noaccessPage.title';
const NOACCESS_ABSTRACT = 'fl.pages.noaccessPage.abstract';
const GOTO_HOME_BUTTON = 'fl.pages.noaccessPage.gotoHomeButton';


const NoAccessPage = ({ gotoHome }) => {
  const gotoHomeButton = (
    <Row>
      <Col xs={12}>
        <Button
          type="button"
          className="NoAccessPage__goto-home-button"
          bsStyle="primary"
          onClick={() => { gotoHome(); }}
        >
          <FormattedMessage id={GOTO_HOME_BUTTON} defaultMessage="Go to Home" />&nbsp;
          <i className="fa fa-arrow-right" />
        </Button>
      </Col>
    </Row>
  );

  return (
    <div className="NoAccessPage">
      <Grid>
        <Row>
          <Col xs={12}>
            <h1 className="NoAccessPage__page-title">
              <FormattedMessage
                id={NOACCESS_TITLE}
                defaultMessage="403"
              />
            </h1>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <p className="NoAccessPage__page-abstract">
              <FormattedMessage
                id={NOACCESS_ABSTRACT}
                defaultMessage="You have no access to this page"
              />
            </p>
          </Col>
        </Row>
        { gotoHome && gotoHomeButton }
      </Grid>
    </div>
  );
};


NoAccessPage.defaultProps = {
  gotoHome: null,
};

NoAccessPage.propTypes = {
  gotoHome: PropTypes.func,
};

export default NoAccessPage;
