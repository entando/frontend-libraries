import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Panel, Form, Button, Row, Col } from 'react-bootstrap';
import { FormattedMessage, FormattedRelative } from 'react-intl';

class Notification extends Component {
  constructor(props) {
    super(props);
    this.comment = null;
  }


  render() {
    const {
      id,
      username,
      notification,
      targetName,
      onClickUsername,
      onClickTargetName,
      onClickLike,
      modificationDate,

    } = this.props;
    const onSubmit = (ev) => {
      ev.preventDefault();
    };

    const onClickUsernameHandler = (ev) => {
      ev.preventDefault();
      onClickUsername(id);
    };

    const onClickTargetNameHandler = (ev) => {
      ev.preventDefault();
      onClickTargetName(id);
    };

    const onClickTargetLikeHandler = (ev) => {
      ev.preventDefault();
      onClickLike(id);
    };

    return (
      <div className="Notification">
        <Row className="Notification__top-row">
          <Col md={12}>
            <i className="Notification__user-icon fa fa-user fa-2x" />
            <a
              href=""
              className="Notification__user"
              onClick={onClickUsernameHandler}
            >{username}
            </a>
            <p className="Notification__notify">{notification}</p>
            <a
              href=""
              className="Notification__link"
              onClick={onClickTargetNameHandler}
            >{targetName}
            </a>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <span className="Notification__date ">
              <FormattedRelative value={modificationDate} />
            </span>
            <a
              href=""
              className="Notification__like"
              onClick={onClickTargetLikeHandler}
            >
              <i className="fa fa-thumbs-up" />
            </a>
          </Col>
        </Row>
        <Panel className="Notification__panel-override">
          <Row className="Notification__comment-section">
            <Panel.Toggle componentClass="a" className="pull-right Notification__comment-section">
              <FormattedMessage
                id="fl.menu.activityStream.writeComment"
              />
            </Panel.Toggle>
          </Row>
          <Panel.Collapse>
            <Panel.Body>
              <Form onSubmit={onSubmit}>
                <Col md={12}>
                  <textarea
                    className="Notification__text-area"
                    ref={(comment) => { this.comment = comment; }}
                  />
                </Col>
                <Col md={12}>
                  <Button type="submit" className="pull-right" bsStyle="primary">
                    <FormattedMessage
                      className="pull-right"
                      id="fl.menu.activityStream.submit"
                    />
                  </Button>
                </Col>
              </Form>
            </Panel.Body>
          </Panel.Collapse>
        </Panel>
      </div>
    );
  }
}

Notification.defaultProps = {
  onClickUsername: () => {},
  onClickTargetName: () => {},
  onClickLike: () => {},
};

Notification.propTypes = {
  id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  notification: PropTypes.string.isRequired,
  targetName: PropTypes.string.isRequired,
  modificationDate: PropTypes.instanceOf(Date).isRequired,
  onClickTargetName: PropTypes.func,
  onClickUsername: PropTypes.func,
  onClickLike: PropTypes.func,
};

export default Notification;
