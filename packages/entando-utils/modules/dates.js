import moment from 'moment';

// eslint-disable-next-line import/prefer-default-export
export const getMonthDayYearFormat = (date, locale = 'en-us') => (
  moment(date).locale(locale).format('MMMM, D, YYYY')
);
