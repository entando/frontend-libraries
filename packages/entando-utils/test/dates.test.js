import { getMonthDayYearFormat } from 'dates';

describe('dates.getMonthDayYearFormat', () => {
  it('returns the correct date given a long', () => {
    expect(getMonthDayYearFormat(1545037646000)).toBe('December, 17, 2018');
  });
});
