import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class BrandMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMenu: '',
    };
  }

  setActiveMenu(id) {
    this.setState({
      activeMenu: id,
    });
  }

  render() {
    const {
      title, brandLogo, children, header, dashboardLink,
    } = this.props;


    let firstLevelMenu = null;
    if (children) {
      // pass onClick and active props to the children
      const enhancedChildren = React.Children.map(children, child => (
        !child ? null : React.cloneElement(
          child,
          {
            onClick: () => {
              if (child.props.route) {
                this.setActiveMenu('');
              } else {
                this.setActiveMenu(child.props.id);
              }
            },
            active: (child.props.id === this.state.activeMenu),
          },
        )));
      // create the menu
      firstLevelMenu = (
        <ul
          className="BrandMenu__first-level-menu nav navbar-nav navbar-primary persistent-secondary"
        >
          { enhancedChildren }
        </ul>
      );
    }

    return (
      <div className="BrandMenu">
        <div className="navbar navbar-default navbar-pf" role="navigation">
          <div className="navbar-header">
            <Link className="BrandMenu__navbar-brand navbar-brand" to={dashboardLink}>
              {brandLogo} {title}
            </Link>
          </div>
          <div className="collapse navbar-collapse navbar-collapse-11">
            <ul className="BrandMenu__navbar-utility nav navbar-nav navbar-utility">
              { header }
            </ul>
          </div>
          { firstLevelMenu }
        </div>
      </div>
    );
  }
}


BrandMenu.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  brandLogo: PropTypes.node,
  header: PropTypes.node,
  dashboardLink: PropTypes.string,
};

BrandMenu.defaultProps = {
  children: null,
  title: '',
  brandLogo: <span>ENTANDO</span>,
  header: null,
  dashboardLink: '',
};

export default BrandMenu;
