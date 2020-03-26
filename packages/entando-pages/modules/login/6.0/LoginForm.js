import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { formattedText } from '@entando/utils';

import { Form, Col, FormGroup, FormControl, Button, Alert } from 'patternfly-react';

const LOGIN_USERNAME_LABEL = 'fl.pages.login.username.placeholder';
const LOGIN_PASSWORD_LABEL = 'fl.pages.login.password.placeholder';
const LOGIN_BUTTON = 'fl.pages.login.button';
const LOGIN_LANG_BUTTON = { it: 'fl.pages.login.lang.it', en: 'fl.pages.login.lang.en' };


class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.username = null;
    this.password = null;
  }

  render() {
    let alertMsg;
    let validationState;
    const {
      loginErrorMessage, performLogin, setLanguage, currentLanguage,
    } = this.props;
    if (loginErrorMessage) {
      alertMsg = <Alert>{loginErrorMessage}</Alert>;
      validationState = 'error';
    }
    const onSubmit = (ev) => {
      ev.preventDefault();
      performLogin(this.username.value, this.password.value);
    };

    // returns an event handler calling setLanguage function
    const onClickLanguage = e => setLanguage(e.target.value);

    return (
      <Form className="LoginForm" onSubmit={onSubmit}>
        {alertMsg}
        <Col>
          <FormGroup controlId="username" disabled={false} validationState={validationState}>
            <label htmlFor="username" className="LoginForm__placeholder">
              {formattedText(LOGIN_USERNAME_LABEL, 'Insert Username', {})}
            </label>
            <FormControl
              className="LoginForm__username-input"
              inputRef={(ref) => { this.username = ref; }}
              type="text"
              disabled={false}
              bsSize="lg"
            />
          </FormGroup>
          <FormGroup controlId="password" disabled={false} validationState={validationState}>
            <label htmlFor="password" className="LoginForm__placeholder">
              {formattedText(LOGIN_PASSWORD_LABEL, 'Insert Password', {})}
            </label>
            <FormControl
              className="LoginForm__password-input"
              inputRef={(ref) => { this.password = ref; }}
              type="password"
              disabled={false}
              bsSize="lg"
            />
          </FormGroup>
        </Col>
        <Col className="LoginForm__button-container">
          <select
            onChange={onClickLanguage}
            className="LoginForm__choose-lang-dropdown"
            defaultValue={currentLanguage}
          >
            <option value="en">
              {formattedText(LOGIN_LANG_BUTTON.en, 'English', {})}
            </option>
            <option value="it">
              {formattedText(LOGIN_LANG_BUTTON.it, 'Italiano', {})}
            </option>
          </select>
          <Button
            type="submit"
            className="LoginForm__login-button  "
            bsStyle="primary"
          >
            <FormattedMessage id={LOGIN_BUTTON} defaultMessage="Login" />
          </Button>
        </Col>
      </Form>
    );
  }
}

LoginForm.defaultProps = {
  loginErrorMessage: '',
  currentLanguage: 'en',
};

LoginForm.propTypes = {
  loginErrorMessage: PropTypes.string,
  performLogin: PropTypes.func.isRequired,
  setLanguage: PropTypes.func.isRequired,
  currentLanguage: PropTypes.string,
};
export default LoginForm;
