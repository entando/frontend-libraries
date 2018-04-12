import IntlMessageFormat from 'intl-messageformat';

let currentLocale;
export const setCurrentLocale = (locale) => {
  currentLocale = locale;
};

export const formattedText = (id, defaultMessage, values) => {
  const message = currentLocale.messages[id] || defaultMessage;

  return new IntlMessageFormat(message).format(values);
};
