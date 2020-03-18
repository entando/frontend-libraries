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
    return (new Date(date)).toISOString().replace('T', ' ').split('.')[0];
  } catch (error) {
    return 'N/A';
  }
};
