import { formattedText, setCurrentLocale } from 'formattedText';

jest.unmock('formattedText');

const LOCALE_EN = {
  locale: 'en',
  messages: {
    'fcc.menu.goToProject': 'Go to {projectName}',
    'fcc.login.formTitle': 'Login Form',
  },
};

const LOCALE_IT = {
  locale: 'it',
  messages: {
    'fcc.menu.goToProject': 'Vai a {projectName}',
    'fcc.login.formTitle': 'Login Form',
  },
};

const PROPERTY = 'fcc.menu.goToProject';
const FAKE_PROPERTY = 'fake.menu.goToProject';
const PROPERTY_TEXT_DEFAULT = 'Test Project {projectName}';

describe('Verify behavior for library formattedText', () => {
  it('verify if property is correctly resolved with EN locale', () => {
    setCurrentLocale(LOCALE_EN);
    const result = formattedText(PROPERTY, PROPERTY_TEXT_DEFAULT, { projectName: 'Test EN' });
    expect(result).toBe('Go to Test EN');
  });

  it('verify if property is correctly resolved with IT locale', () => {
    setCurrentLocale(LOCALE_IT);
    const result = formattedText(PROPERTY, PROPERTY_TEXT_DEFAULT, { projectName: 'Test ITA' });
    expect(result).toBe('Vai a Test ITA');
  });
});


describe('default property formattedText', () => {
  it('verify if pass a wrong property the default text is corrected. Use EN', () => {
    setCurrentLocale(LOCALE_EN);
    const result = formattedText(FAKE_PROPERTY, PROPERTY_TEXT_DEFAULT, { projectName: 'Test' });
    expect(result).toBe('Test Project Test');
  });

  it('verify if pass a wrong property the default text is corrected. Use ITA', () => {
    setCurrentLocale(LOCALE_IT);
    const result = formattedText(FAKE_PROPERTY, PROPERTY_TEXT_DEFAULT, { projectName: 'Test' });
    expect(result).toBe('Test Project Test');
  });
});
