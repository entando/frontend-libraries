import * as ddtable from 'index';

describe('exports all ddtable components', () => {
  it('is an object', () => {
    expect(typeof ddtable).toBe('object');
  });

  it('exports DDTable', () => {
    expect(ddtable).toHaveProperty('DDTable', expect.any(Function));
  });

  it('exports DDTable.Tr', () => {
    expect(ddtable).toHaveProperty('DDTable.Tr', expect.any(Function));
  });

  it('exports DDTable.Handle', () => {
    expect(ddtable).toHaveProperty('DDTable.Handle', expect.any(Function));
  });
});
