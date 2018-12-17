// eslint-disable-next-line import/prefer-default-export
export const getMonthDayYearFormat = (date, locale = 'en-us') => {
  const dateObject = new Date(date);
  return dateObject.toLocaleString(locale, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};
