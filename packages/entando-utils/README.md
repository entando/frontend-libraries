# utils

Utils include a series of helpers that can be used in different scenarios

## Installation instructions

run `npm i @entando/utils`

---

## Logic Helpers

Every helper is imported in the following manner:

```js
import { <helper> } from '@entando/utils'
```

the `<helper>` name always matches the one in the title of the following sections. Each title also contains the expected arguments and the return type of helper in between square brackets.

### hasAccess(requiredPermissions, currentUserPermissions) [bool]
the first parameter can be either a string or an array of string, the second parameter can be either a string or an array of string. if the user permissions contain any of the required permissions the helper will return true.

### throttle(callback) [void]

```js
throttle(callback);
```

`throttle()` executes the callback after a random number of milliseconds.
This helper is used to simulate async calls.

### routeConverter(route, params) [string]

```js
routeConverter('myroute/:param1/:param2', {
  param1: 12,
  param2: 22,
});
```

`routeConverter()` replaces placeholders with the values found in the given object.
The aforementioned example will return `/myroute/12/22`.

### isInteger(numericValue) [bool]

```js
isInteger(numericValue);
```

`isInteger()` checks whether or not a numeric value is an integer. Numeric strings that can be converted to integers pass the test.

### isEmpty(string) [bool]

```js
isEmpty(string);
```

`isEmpty()` checks whether or not a string is empty. The helper also trims the string when testing to ensure that string only containing spaces won't pass the test.

### addFilter(filter) [string]

```js
const filter = {
  attribute: 'code',
  value: 'test_code',
  operator: FILTER_OPERATORS.LIKE,
  pos: 0,
};

addFilter(filter);
```

`addFilter()` converts a filter object into the query string equivalent:

```js
'filters[0].attribute=code&filters[0].operator=like&filters[0].value=test_code'
```

Also, if the value property is multi-value (an array), `value` in query string will be converted into `allowedValues`. For example, if you have such filter:

```js
const filter = {
  attribute: 'code',
  value: ['test', 'code'],
  operator: FILTER_OPERATORS.EQUAL,
  pos: 1,
};

addFilter(filter);
```

This will result into this query string below:

```js
'filters[1].attribute=code&filters[1].operator=eq&filters[1].allowedValues[0]=test&filters[1].allowedValues[1]=code'
```


The method itself does not validate any of the values in the object.

### setSorting(sorting) [array]

```js
setSorting({
  attribute: 'code',
  direction: SORT_DIRECTIONS.ASCENDANT,
});
```

`setSorting()` returns an array that can be easily converted into a query string through `join()`. The first element of the array is always the sort attribute, while the second one contains the direction.

```js
[
  'sort=attributeName',
  'direction=ASC',
]
```

If the direction sent is not listed in the `SORT_DIRECTIONS` constant the default one will be used.

### setFilters(object, operators) [array]

```js
const object = {
  carName: 'fiat',
  model: 'punto',
  year: 2012,
};

const operators = {
  carName: FILTER_OPERATORS.EQUAL,
  model: FILTER_OPERATORS.EQUAL,
  year: FILTER_OPERATORS.EQUAL,
};

setFilters(object, operators);
```

`setFilters()` returns an array that can be easily converted into a query string through `join()`. Each element of the array is a string like the one returned by `addFilter()`.

`object` is an object in which each key is the attribute name and the value is the actual value.

`operators` is another object where each key is the attribute name and the value is the operator used by the filter.

```js
[
  'sort=attributeName',
  'direction=ASC',
]
```

If the operator for the given attribute name cannot be found the default operator is going to be used.

### convertToQueryString(filters) [string]

```js
const filters = {
  formValues: object,
  operators,
  sorting: {
    attribute: 'code',
  },
};

converToQueryString(filters);
```

`convertToQueryString()` combines the functionalities of `setSorting()` and `setFilters()` returning already a query string.

`formValues` contains the same `object` described in the `setFilters()` helper.

`operators` contains the same `operators` object described in `setFilters()` helper.

`sorting` contains the same type of object described in the `setSorting()` helper.

The resulting string is prepended by a `?`, or empty if no query string could be generated.

### setCurrentLocale(locale)

Sets the current locale for the formattedText method.

### formattedText(id, defaultMessage, values) [IntlMessageFormat]

Returns a `IntlMessageFormat` object containing the translation for the given message id.

### getMonthDayYearFormat(date, locale) [string]

`getMonthDayYearFormat` expect any valid `date` string/integer as the first argument, and any valid `locale` as the second argument. Locale defaults to `en-us` if not specified.

Returns a string in the desired locale format: i.e. "January 12, 2018".

---

## React Helpers

Every helper is imported in the following manner:

```js
import { <helper> } from '@entando/utils'
```

Every helper returns a react component.

### PermissionCheck
this component will either render the children or the given 403 page.
the given properties are required:

- children
- page403: the 403 page to render. a default one is now part of @entando/pages
- requiredPermissions: the list of required permissions (see hasAccess)
- userPermissions: the current user permissions (see hasAccess)

### required(value)

Returns a `FormattedMessage` component if `value` is not defined

### maxLength(max)(value)

Returns a `FormattedMessage` component if `value`'s length is greater than `max`

### minLength(min)(value)

Returns a `FormattedMessage` component if `value`'s length is less than `min`

### isNumber(value)

Returns a `FormattedMessage` component if `value` is not a number.

### minValue(min)(value)

Returns a `FormattedMessage` component if `value` is less than `min`

### maxValue(max)(value)

Returns a `FormattedMessage` component if `value` is greater than `max`

### email(value)

Returns a `FormattedMessage` component if `value` is not a valid email address.

### alphaNumeric(value)

Returns a `FormattedMessage` component if `value` is not alphanumeric.

### widgetCode(value)

Returns a `FormattedMessage` component if `value`'s format is not valid for widget codes.

### userFormText(value)

Returns a `FormattedMessage` component if `value`'s format is not valid for user form texts.

### code(value)

Returns a `FormattedMessage` component if `value`'s format is not valid for a code.

### matchElement(fieldName, messageId)(value, allValues)

Returns a `FormattedMessage` component with the given `messageId` if `value` does not match the value of the `fieldName` key in the `allValues` object.

### matchPassword(value, allValues)

Returns a `FormattedMessage` component if the given `value` does not match the value in the password key of the `allValues` object.

---

## Constants

A few constants are also exported by this package.

### FILTER_OPERATORS and DEFAULT_FILTER_OPERATOR

`FILTER_OPERATORS` list the operators that should be used when using the `setFilters` helper.

The available keys are: `EQUAL`, `GREATER_THAN`, `LESS_THAN`, `NOT` and `LIKE`.

### SORT_DIRECTIONS and DEFAULT_SORT_DIRECTION

`SORT_DIRECTIONS` list the directions that should be used when using the `setSorting` helper.

The available keys are: `ASCENDANT` and `DESCENDANT`.
