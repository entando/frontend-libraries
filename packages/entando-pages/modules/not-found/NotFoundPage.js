import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Grid, Row, Col, Button } from 'patternfly-react';

const NOTFOUNDPAGE_TITLE = 'fl.pages.notfoundPage.title';
const NOTFOUNDPAGE_ABSTRACT = 'fl.pages.notfoundPage.abstract';
const GOTO_HOME_BUTTON = 'fl.pages.notfoundPage.gotoHomeButton';


const NotFoundPage = ({ gotoHome }) => {
  const gotoHomeButton = (
    <Row>
      <Col xs={12}>
        <Button
          type="button"
          className="NotFoundPage__goto-home-button"
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
    <div className="NotFoundPage">
      <Grid>
        <Row>
          <Col xs={12}>
            <h1 className="NotFoundPage__page-title">
              <FormattedMessage
                id={NOTFOUNDPAGE_TITLE}
                defaultMessage="404"
              />
            </h1>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <p className="NotFoundPage__page-abstract">
              <FormattedMessage
                id={NOTFOUNDPAGE_ABSTRACT}
                defaultMessage="The request page was not found"
              />
            </p>
          </Col>
        </Row>
        { gotoHome && gotoHomeButton }
      </Grid>
    </div>
  );
};


NotFoundPage.defaultProps = {
  gotoHome: null,
};

NotFoundPage.propTypes = {
  gotoHome: PropTypes.func,
};

export default NotFoundPage;
