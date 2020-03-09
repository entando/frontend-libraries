import React from 'react';
import PropTypes from 'prop-types';
import { config } from '../api/apiManager';
import { setApi } from '../state/api/actions';

class ApiProvider extends React.Component {
  constructor(props) {
    super(props);
    this.initApiManager();
  }

  initApiManager() {
    const {
      store,
      plugins,
      domain,
      useMocks,
      onLogout,
      onLogin,
    } = this.props;

    config(store, onLogout, onLogin);

    store.dispatch(setApi({ domain, useMocks }));

    if (plugins.length) {
      plugins.forEach((plugin) => {
        if (plugin.apiManagerConfig) {
          plugin.apiManagerConfig(store, onLogout, onLogin);
        }
      });
    }
  }

  render() {
    return (
      <React.Fragment>{this.props.children}</React.Fragment>
    );
  }
}

ApiProvider.propTypes = {
  store: PropTypes.shape({}).isRequired,
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  domain: PropTypes.string.isRequired,
  plugins: PropTypes.arrayOf(PropTypes.shape({})),
  useMocks: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

ApiProvider.defaultProps = {
  useMocks: false,
  plugins: [],
};

export default ApiProvider;
