import * as pages from 'index';

describe('exports all pages components', () => {
  it('is an object', () => {
    expect(typeof pages).toBe('object');
  });

  it('exports LoginForm', () => {
    expect(pages).toHaveProperty('LoginForm', expect.any(Function));
  });

  it('exports LoginPage', () => {
    expect(pages).toHaveProperty('LoginPage', expect.any(Function));
  });

  it('exports NotFoundPage', () => {
    expect(pages).toHaveProperty('NotFoundPage', expect.any(Function));
  });

  it('exports locales', () => {
    expect(pages).toHaveProperty('locales');
    expect(pages).toHaveProperty('locales.it', expect.any(Object));
    expect(pages).toHaveProperty('locales.it.locale', 'it');
    expect(pages).toHaveProperty('locales.en', expect.any(Object));
    expect(pages).toHaveProperty('locales.en.locale', 'en');
  });
});
