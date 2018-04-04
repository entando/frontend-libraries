import * as utils from 'index';

describe('exports all utilities', () => {
  it('is an object', () => {
    expect(typeof utils).toBe('object');
  });

  it('exports throttle', () => {
    expect(utils).toHaveProperty('throttle', expect.any(Function));
  });

  describe('numeric', () => {
    it('exports isInteger', () => {
      expect(utils).toHaveProperty('isInteger', expect.any(Function));
    });
  });

  describe('queryStringManager', () => {
    it('exports DEFAULT_FILTER_OPERATOR', () => {
      expect(utils).toHaveProperty('DEFAULT_FILTER_OPERATOR', 'eq');
    });

    it('exports FILTER_OPERATORS', () => {
      expect(utils).toHaveProperty('FILTER_OPERATORS', expect.any(Object));
    });

    it('exports SORT_DIRECTIONS', () => {
      expect(utils).toHaveProperty('SORT_DIRECTIONS', expect.any(Object));
    });

    it('exports DEFAULT_SORT_DIRECTION', () => {
      expect(utils).toHaveProperty('DEFAULT_SORT_DIRECTION', 'ASC');
    });

    it('exports addFilter', () => {
      expect(utils).toHaveProperty('addFilter', expect.any(Function));
    });

    it('exports setSorting', () => {
      expect(utils).toHaveProperty('setSorting', expect.any(Function));
    });

    it('exports setFilters', () => {
      expect(utils).toHaveProperty('setFilters', expect.any(Function));
    });

    it('exports convertToQueryString', () => {
      expect(utils).toHaveProperty('convertToQueryString', expect.any(Function));
    });
  });

  describe('string', () => {
    it('exports isEmpty', () => {
      expect(utils).toHaveProperty('isEmpty', expect.any(Function));
    });
  });

  describe('validateForm', () => {
    it('exports required', () => {
      expect(utils).toHaveProperty('required', expect.any(Function));
    });

    it('exports maxLength', () => {
      expect(utils).toHaveProperty('maxLength', expect.any(Function));
    });

    it('exports minLength', () => {
      expect(utils).toHaveProperty('minLength', expect.any(Function));
    });

    it('exports isNumber', () => {
      expect(utils).toHaveProperty('isNumber', expect.any(Function));
    });

    it('exports minValue', () => {
      expect(utils).toHaveProperty('minValue', expect.any(Function));
    });

    it('exports maxValue', () => {
      expect(utils).toHaveProperty('maxValue', expect.any(Function));
    });

    it('exports email', () => {
      expect(utils).toHaveProperty('email', expect.any(Function));
    });

    it('exports alphaNumeric', () => {
      expect(utils).toHaveProperty('alphaNumeric', expect.any(Function));
    });

    it('exports widgetCode', () => {
      expect(utils).toHaveProperty('widgetCode', expect.any(Function));
    });

    it('exports userFormText', () => {
      expect(utils).toHaveProperty('userFormText', expect.any(Function));
    });

    it('exports code', () => {
      expect(utils).toHaveProperty('code', expect.any(Function));
    });

    it('exports matchElement', () => {
      expect(utils).toHaveProperty('matchElement', expect.any(Function));
    });

    it('exports matchPassword', () => {
      expect(utils).toHaveProperty('matchPassword', expect.any(Function));
    });
  });
});
