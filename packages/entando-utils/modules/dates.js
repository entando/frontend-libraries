import moment from 'moment';

export const getMonthDayYearFormat = (date, locale = 'en-us') => {
  const dateObject = new Date(date);
  return dateObject.toLocaleString(locale, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

export const formatDate = (date) => {
  try {
    const target = new Date(date);
    return moment(target).format('YYYY-MM-DD HH:mm');
  } catch (error) {
    return 'N/A';
  }
};
