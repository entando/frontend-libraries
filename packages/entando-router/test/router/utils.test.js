import { deparam, coerceTypes } from 'router/utils';


describe('router/utils', () => {
  describe('deparam()', () => {
    it('should parse an empty query string', () => {
      expect(deparam('')).toEqual({});
    });
    it('should parse a single param', () => {
      expect(deparam('a=b')).toEqual({ a: 'b' });
    });
    it('should parse a single empty param', () => {
      expect(deparam('a')).toEqual({ a: '' });
    });
    it('should parse multiple parameters', () => {
      expect(deparam('a=b&c=6')).toEqual({ a: 'b', c: '6' });
    });
    it('should parse multiple empty parameters', () => {
      expect(deparam('a&c')).toEqual({ a: '', c: '' });
    });
    it('should decode URI encoded characters', () => {
      expect(deparam('a=%26&c=%20')).toEqual({ a: '&', c: ' ' });
    });
  });

  describe('coerceTypes()', () => {
    it('should coerce property of type number', () => {
      expect(coerceTypes({ a: '6' })).toEqual({ a: 6 });
    });
    it('should coerce property of type undefined', () => {
      expect(coerceTypes({ a: 'undefined' })).toEqual({ a: undefined });
    });
    it('should coerce property of type null', () => {
      expect(coerceTypes({ a: 'null' })).toEqual({ a: null });
    });
    it('should coerce property of type boolean', () => {
      expect(coerceTypes({ a: 'true' })).toEqual({ a: true });
      expect(coerceTypes({ a: 'false' })).toEqual({ a: false });
    });
    it('should coerce an empty property to an empty string by default', () => {
      expect(coerceTypes({ a: '' })).toEqual({ a: '' });
    });
    it('should coerce an empty property to the specified value', () => {
      const EMPTY = '<empty>';
      expect(coerceTypes({ a: '' }, EMPTY)).toEqual({ a: EMPTY });
    });
    it('should not coerce other strings', () => {
      const VALUE = 'a random value';
      expect(coerceTypes({ a: VALUE })).toEqual({ a: VALUE });
    });
  });
});
