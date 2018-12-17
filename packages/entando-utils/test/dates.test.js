import { getMonthDayYearFormat } from 'dates';

describe('dates.getMonthDayYearFormat', () => {
  it('returns the correct date given a long', () => {
    expect(getMonthDayYearFormat(1525316833590)).toBe('May 3, 2018');
  });
});
