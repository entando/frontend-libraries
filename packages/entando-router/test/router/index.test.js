import { reducer, Link } from 'router';

describe('router index.js', () => {
  it('should export "reducer"', () => {
    expect(reducer).toBeDefined();
    expect(typeof reducer).toBe('function');
  });
  it('should export "Link"', () => {
    expect(Link).toBeDefined();
  });
});
