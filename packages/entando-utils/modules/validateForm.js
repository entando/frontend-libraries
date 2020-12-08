import React from 'react';
import { FormattedMessage } from 'react-intl';

export const required = value =>
  (value ? undefined : <FormattedMessage id="validateForm.required" />);

export const maxLength = max => value =>
  (value && value.length > max ?
    <FormattedMessage
      id="validateForm.maxLength"
      values={{ max: <b>{max}</b> }}
    /> : undefined);

export const minLength = min => value =>
  (value && value.length < min ?
    <FormattedMessage
      id="validateForm.minLength"
      values={{ min: <b>{min}</b> }}
    /> : undefined);

export const isNumber = value =>
  (value && !/^(\d)*$/.test(value) ? <FormattedMessage id="validateForm.number" /> : undefined);

const number = value => !Number.isNaN(parseFloat(value));

export const minValue = min => value =>
  (number(value) && value < min ?
    <FormattedMessage
      id="validateForm.minValue"
      values={{ min: <b>{min}</b> }}
    /> : undefined);

export const maxValue = max => value =>
  (number(value) && value > max ?
    <FormattedMessage
      id="validateForm.maxValue"
      values={{ max: <b>{max}</b> }}
    /> : undefined);

// the following regex is the same one used in entando-engine
// eslint-disable-next-line no-control-regex
const emailRegex = /^(?:[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[A-Za-z0-9-]*[A-Za-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

export const email = value =>
  (value && !emailRegex.test(value)
    ? <FormattedMessage id="validateForm.email" /> : undefined);

export const alphaNumeric = value =>
  (value && /^[a-z0-9]+$/i.test(value) ?
    <FormattedMessage id="validateForm.alphaNumeric" /> : undefined);

export const widgetCode = value =>
  (value && /^[0-9a-zA-Z_]+$/i.test(value) ?
    undefined :
    <FormattedMessage
      id="validateForm.widgetCode"
      values={{ name: <b>{value}</b> }}
    />);

export const userFormText = value => (
  value && /^[0-9a-zA-Z_.]+$/i.test(value) ?
    undefined :
    <FormattedMessage
      id="user.validate.text"
    />
);

export const code = value => (
  value && /^[0-9a-zA-Z_.]+$/i.test(value) ?
    undefined :
    <FormattedMessage
      id="validateForm.code"
    />
);

export const matchElement = (fieldName, messageId) => (value, allValues) =>
  (
    value && value === allValues[fieldName] ?
      undefined :
      <FormattedMessage
        id={messageId}
      />
  );

export const matchPassword = matchElement('password', 'validateForm.passwordNotMatch');
