import IntlMessageFormat from 'intl-messageformat';

console.log('loaded');
let currentLocale;
export const setCurrentLocale = (locale) => {
  currentLocale = locale;
  console.log(locale);
};

export const formattedText = (id, defaultMessage, values) => {
  const message = currentLocale.messages[id] || defaultMessage;

  return new IntlMessageFormat(message).format(values);
};
