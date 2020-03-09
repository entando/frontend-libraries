import env from 'env';

describe('env', () => {
  it('is a function', () => {
    expect(env).toBeInstanceOf(Function);
  });

  it('returns a promise', () => {
    expect(process).not.toHaveProperty('entando');
    expect(env('overrides.json')).toBeInstanceOf(Promise);
  });

  it('generates after the promise the new entando object inside process', (done) => {
    env('overrides.json').then(() => {
      expect(process).toHaveProperty('entando');
      expect(process).toHaveProperty('entando.name', 'whatever');
      done();
    });
  });
});
