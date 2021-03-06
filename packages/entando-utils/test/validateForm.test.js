import {
  required,
  maxLength,
  minLength,
  isNumber,
  minValue,
  maxValue,
  email,
  alphaNumeric,
  widgetCode,
  userFormText,
  matchElement,
} from 'validateForm';


jest.mock('react-intl', () => ({ FormattedMessage: 'Error', addLocaleData: () => jest.fn() }));

describe('util/validateForm', () => {
  let foo;

  describe('verify required function', () => {
    it('pass', () => {
      foo = required('test');
      expect(foo).toBeUndefined();
    });
    it('fail', () => {
      foo = required(null);
      expect(foo).toHaveProperty('type', 'Error');
      expect(foo).toHaveProperty('props.id', 'validateForm.required');
    });
  });
  describe('verify maxLength function', () => {
    it('fail', () => {
      foo = maxLength(3)('abcde');
      expect(foo).toHaveProperty('type', 'Error');
      expect(foo).toHaveProperty('props.id', 'validateForm.maxLength');
    });
    it('pass', () => {
      foo = maxLength(3)('abc');
      expect(foo).toBeUndefined();
    });
  });

  describe('verify minLength function', () => {
    it('fail', () => {
      foo = minLength(3)('ab');
      expect(foo).toHaveProperty('type', 'Error');
      expect(foo).toHaveProperty('props.id', 'validateForm.minLength');
    });
    it('pass', () => {
      foo = minLength(3)('abcde');
      expect(foo).toBeUndefined();
    });
  });

  describe('verify isNumber function', () => {
    it('fail', () => {
      foo = isNumber('a');
      expect(foo).toHaveProperty('type', 'Error');
      expect(foo).toHaveProperty('props.id', 'validateForm.number');
    });

    it('fails if does not contain only numbers', () => {
      foo = isNumber('23a3');
      expect(foo).toHaveProperty('type', 'Error');
      expect(foo).toHaveProperty('props.id', 'validateForm.number');
    });

    it('pass', () => {
      foo = isNumber(1);
      expect(foo).toBeUndefined();
    });
  });

  describe('verify minValue function', () => {
    it('fail', () => {
      foo = minValue(10)(5);
      expect(foo).toHaveProperty('type', 'Error');
      expect(foo).toHaveProperty('props.id', 'validateForm.minValue');
    });
    it('pass', () => {
      foo = minValue(3)(10);
      expect(foo).toBeUndefined();
    });
  });
  describe('verify maxValue function', () => {
    it('fail', () => {
      foo = maxValue(10)(15);
      expect(foo).toHaveProperty('type', 'Error');
      expect(foo).toHaveProperty('props.id', 'validateForm.maxValue');
    });
    it('pass', () => {
      foo = maxValue(10)(5);
      expect(foo).toBeUndefined();
    });
  });
  describe('verify email function', () => {
    it('fail', () => {
      foo = email('test.entando.com');
      expect(foo).toHaveProperty('type', 'Error');
      expect(foo).toHaveProperty('props.id', 'validateForm.email');

      foo = email('j.brown@entando');
      expect(foo).toHaveProperty('type', 'Error');
      expect(foo).toHaveProperty('props.id', 'validateForm.email');

      foo = email('j.brown@entando com');
      expect(foo).toHaveProperty('type', 'Error');
      expect(foo).toHaveProperty('props.id', 'validateForm.email');

      foo = email('j.brown@ent@ando.com');
      expect(foo).toHaveProperty('type', 'Error');
      expect(foo).toHaveProperty('props.id', 'validateForm.email');

      foo = email('j.brownentando.com');
      expect(foo).toHaveProperty('type', 'Error');
      expect(foo).toHaveProperty('props.id', 'validateForm.email');

      foo = email('j.brown@ent ando.com');
      expect(foo).toHaveProperty('type', 'Error');
      expect(foo).toHaveProperty('props.id', 'validateForm.email');

      foo = email('j.brown@ent$ando.com');
      expect(foo).toHaveProperty('type', 'Error');
      expect(foo).toHaveProperty('props.id', 'validateForm.email');

      foo = email('j.brown@@entando.com');
      expect(foo).toHaveProperty('type', 'Error');
      expect(foo).toHaveProperty('props.id', 'validateForm.email');

      foo = email('j.brown.entando.com');
      expect(foo).toHaveProperty('type', 'Error');
      expect(foo).toHaveProperty('props.id', 'validateForm.email');

      foo = email('hello.AH-hello@hello.helo');
      expect(foo).toHaveProperty('type', 'Error');
      expect(foo).toHaveProperty('props.id', 'validateForm.email');
    });

    it('pass', () => {
      foo = email('test@entando.com');
      expect(foo).toBeUndefined();

      foo = email('user@example.com');
      expect(foo).toBeUndefined();

      foo = email('user.name@example.com');
      expect(foo).toBeUndefined();

      foo = email('user-name@example.com');
      expect(foo).toBeUndefined();

      foo = email('averylongemailusernamexxxxxxxxxxxxxx@examplexxxxxxxxxxxxxxxxxx.com');
      expect(foo).toBeUndefined();

      foo = email('user-name@example.it');
      expect(foo).toBeUndefined();
    });
  });

  describe('verify alphaNumeric function', () => {
    it('fail', () => {
      foo = alphaNumeric('a');
      expect(foo).toHaveProperty('type', 'Error');
      expect(foo).toHaveProperty('props.id', 'validateForm.alphaNumeric');
    });
    it('pass', () => {
      foo = alphaNumeric('a.');
      expect(foo).toBeUndefined();
    });
  });
  describe('verify widgetCode function', () => {
    it('fail', () => {
      foo = widgetCode('code.');
      expect(foo).toHaveProperty('type', 'Error');
      expect(foo).toHaveProperty('props.id', 'validateForm.widgetCode');
    });
    it('pass', () => {
      foo = widgetCode('code_');
      expect(foo).toBeUndefined();
    });
  });

  describe('verify userFormText function', () => {
    it('fail', () => {
      foo = userFormText('text!!witherror');
      expect(foo).toHaveProperty('type', 'Error');
      expect(foo).toHaveProperty('props.id', 'user.validate.text');
    });

    it('pass', () => {
      foo = widgetCode('correct_text');
      expect(foo).toBeUndefined();
    });
  });

  describe('verify matchElement function', () => {
    it('fail', () => {
      foo = matchElement('element', 'error.message')('badvalue', { element: 'value' });
      expect(foo).toHaveProperty('type', 'Error');
      expect(foo).toHaveProperty('props.id', 'error.message');
    });

    it('pass', () => {
      foo = matchElement('element', 'error.message')('value', { element: 'value' });
      expect(foo).toBeUndefined();
    });
  });
});
