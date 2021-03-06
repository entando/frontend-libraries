import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, defineMessages, intlShape } from 'react-intl';

const LOGIN_USERNAME_LABEL = 'fl.pages.login.username.placeholder';
const LOGIN_PASSWORD_LABEL = 'fl.pages.login.password.placeholder';
const LOGIN_BUTTON = 'fl.pages.login.button';
const LOGIN_LANG_BUTTON = { it: 'fl.pages.login.lang.it', en: 'fl.pages.login.lang.en' };
const LOGINPAGE_COPYRIGHT = 'fl.pages.loginPage.copyright';

const loginMsgs = defineMessages({
  username: {
    id: LOGIN_USERNAME_LABEL,
    defaultMessage: 'Username',
  },
  password: {
    id: LOGIN_PASSWORD_LABEL,
    defaultMessage: 'Password',
  },
  english: {
    id: LOGIN_LANG_BUTTON.en,
    defaultMessage: 'English',
  },
  italian: {
    id: LOGIN_LANG_BUTTON.it,
    defaultMessage: 'Italiano',
  },
});

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.username = null;
    this.password = null;
    this.mounted = false;
    this.state = {
      username: null,
      password: null,
      loading: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  onSubmit(ev) {
    const { performLogin } = this.props;
    this.setState({ loading: true });
    ev.preventDefault();
    performLogin(this.state.username, this.state.password)
      .then(() => { if (this.mounted) { this.setState({ loading: false }); } })
      .catch(() => { if (this.mounted) { this.setState({ loading: false }); } });
  }

  render() {
    let alertMsg;
    const {
      loginErrorMessage, setLanguage, currentLanguage, intl,
    } = this.props;
    if (loginErrorMessage) {
      alertMsg = <div className="LoginPage__error">{loginErrorMessage}</div>;
    }

    // returns an event handler calling setLanguage function
    const onClickLanguage = e => setLanguage(e.target.value);

    const actionStyles = loginErrorMessage ? { marginTop: 0 } : null;

    return (
      <form className="LoginPage__form" onSubmit={this.onSubmit} method="post">
        <div className="LoginPage__brand">
          <div className="LoginPage__logo" style={{ backgroundImage: 'url(images/login-logo.svg)' }} />
          <div className="LoginPage__description" />
        </div>
        <div className="LoginPage__formGroup">
          <div className="LoginPage__inputGroup">
            <label className="LoginPage__label">
              <FormattedMessage id={LOGIN_USERNAME_LABEL} />
            </label>
            <input
              type="text"
              name="username"
              tabIndex="0"
              className="LoginPage__input"
              id="username"
              placeholder={intl.formatMessage(loginMsgs.username)}
              onChange={e => this.setState({ username: e.target.value })}
            />
          </div>
          <div className="LoginPage__inputGroup extra-margin">
            <label className="LoginPage__label">
              <FormattedMessage id={LOGIN_PASSWORD_LABEL} />
            </label>
            <input
              type="password"
              name="password"
              tabIndex="0"
              className="LoginPage__input"
              id="password"
              placeholder={intl.formatMessage(loginMsgs.password)}
              onChange={e => this.setState({ password: e.target.value })}
            />
            {alertMsg}
          </div>
          <div className="LoginPage__actionGroup" style={actionStyles}>
            <div className="LoginPage__selectBox">
              <select
                className="LoginPage__select"
                onChange={onClickLanguage}
                defaultValue={currentLanguage}
                style={{ backgroundImage: 'url(images/caret-down.svg)', backgroundRepeat: 'no-repeat' }}
              >
                <option className="LoginPage__select__option" value="en">
                  {intl.formatMessage(loginMsgs.english)}
                </option>
                <option className="LoginPage__select__option" value="it">
                  {intl.formatMessage(loginMsgs.italian)}
                </option>
              </select>
            </div>
            <button
              className="LoginPage__button"
              type="submit"
              style={{ display: this.state.loading ? 'none' : 'block' }}
            ><FormattedMessage id={LOGIN_BUTTON} defaultMessage="Login" />
            </button>
            <div className="LoginPage__loading" style={{ display: this.state.loading ? 'grid' : 'none' }}>
              <div className="LoginPage__spinner" />
            </div>
          </div>
        </div>
        <div className="LoginPage__copyright">
          <FormattedMessage
            id={LOGINPAGE_COPYRIGHT}
            values={{ year: (new Date()).getFullYear() }}
          /> <a href="https://www.entando.com/" className="LoginPage__url">Entando</a>
        </div>
      </form>
    );
  }
}

LoginForm.defaultProps = {
  loginErrorMessage: '',
  currentLanguage: 'en',
};

LoginForm.propTypes = {
  intl: intlShape.isRequired,
  loginErrorMessage: PropTypes.string,
  performLogin: PropTypes.func.isRequired,
  setLanguage: PropTypes.func.isRequired,
  currentLanguage: PropTypes.string,
};
export default LoginForm;
