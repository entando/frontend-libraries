import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Col } from 'patternfly-react';

const LOGINPAGE_TITLE = 'fl.pages.loginPage.title';
const LOGINPAGE_SUBTITLE = 'fl.pages.loginPage.subtitle';
const LOGINPAGE_ABSTRACT = 'fl.pages.loginPage.abstract';
const LOGINPAGE_COPYRIGHT = 'fl.pages.loginPage.copyright';
const LOGINPAGE_ENTANDO = 'fl.pages.loginPage.entando';

const background = {
  background: 'url(images/bg-login.jpg)',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  backgroundAttachment: 'fixed',
  backgroundSize: 'cover',
};

const LoginPage = ({ children }) => (
  <div className="LoginPage" style={background}>

    <Col sm={6}>
      <div className="LoginPage__left-wrapper">
        <div className="LoginPage__header">
          <div className="LoginPage__brand">
            <img src="images/entando-logo.svg" alt="" />
          </div>
          <p className="LoginPage__title">
            <FormattedMessage id={LOGINPAGE_TITLE} />
          </p>
          <p className="LoginPage__subtitle">
            <FormattedMessage id={LOGINPAGE_SUBTITLE} />
          </p>
          <div className="LoginPage__spacer" />
          <p className="LoginPage__abstract">
            <FormattedMessage
              id={LOGINPAGE_ABSTRACT}
            />
          </p>
          <div className="LoginPage__copyright" >
            <FormattedMessage
              id={LOGINPAGE_COPYRIGHT}
            />
            <span className="LoginPage__entando">&nbsp;
              <FormattedMessage
                id={LOGINPAGE_ENTANDO}
              />
            </span>
          </div>
        </div>
      </div>
    </Col>
    <Col sm={6} className="login LoginPage__children">
      <div className="LoginPage__right-wrapper">
        {children}
      </div>
    </Col>
  </div>
);

LoginPage.defaultProps = {
  children: null,
};

LoginPage.propTypes = {
  children: PropTypes.node,
};

export default LoginPage;
