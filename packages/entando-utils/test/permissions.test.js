import { hasAccess } from 'permissions';

describe('permissions', () => {
  describe('hasAccess', () => {
    it('returns false if no argument is supplied', () => {
      expect(hasAccess()).toBe(false);
    });

    it('returns false if the first argument is a string and no second argument is supplied', () => {
      expect(hasAccess('asdf')).toBe(false);
    });

    it('returns false if the first argument is an array and no second argument is supplied', () => {
      expect(hasAccess([])).toBe(false);
      expect(hasAccess(['asdf'])).toBe(false);
    });

    it('return false if no user permission matches the required permission', () => {
      expect(hasAccess(
        'needed',
        ['others'],
      )).toBe(false);
      expect(hasAccess(
        ['needed', 'mine'],
        ['others'],
      )).toBe(false);
    });

    it('returns true if the user permissions match the required permissions', () => {
      expect(hasAccess(
        'needed',
        'needed',
      )).toBe(true);
      expect(hasAccess(
        'needed',
        ['needed', 'more'],
      )).toBe(true);
      expect(hasAccess(
        ['needed', 'mine'],
        ['what', 'mine'],
      )).toBe(true);
    });
  });
});
