# Entando ENV

this package is designed to create and override env variables in a React project.

```js
import env from '@entando/env';

env('path/To/Overrides.json').then(() => {
  ReactDOM.render(<App />, document.getElementById('root'));
});
```

the package returns a function that expect as an argument the path of the json containing the overrides:

```js
{
  "name": "whatever"
}
```

This path **cannot** be relative:

```js
'./file.json' // bad
'../../file.json' // bad
'file.json' // good
'directory/file.json' // good
```

the package will then create inside a `process` a new object named `entando` which will be the resulting merge of `process.env` with the JSON containing the overrides.

after creating `process.entando` it will return a promise which should be used in the `index.js` to render the React app as in the example above.

every part of the application will then be able to consume the new object at will.
