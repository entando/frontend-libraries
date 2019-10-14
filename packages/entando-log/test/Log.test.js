import Log from 'Log';

const console = jest.spyOn(global.console, 'log').mockImplementation();

describe('Log', () => {
  beforeEach(() => {
    console.mockReset();
  });

  it('is a object', () => {
    expect(Log).toBeInstanceOf(Object);
  });

  it('contains 8 functions', () => {
    expect(Object.keys(Log)).toHaveLength(8);
  });

  describe.each(Object.keys(Log))('%s', (property) => {
    const times = property === 'title' ? 3 : 1;

    test('is a function', () => {
      expect(Log).toHaveProperty(property, expect.any(Function));
    });

    it('calls console.log', () => {
      Log[property]('');
      expect(console).toHaveBeenCalledTimes(times);
    });

    it('returns back log', () => {
      expect(Log[property]('')).toBe(Log);
    });
  });
});
