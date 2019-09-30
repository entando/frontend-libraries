# apiManager

This is the api manager used in the entando projects.

## Installation instructions

run `npm i @entando/apimanager`

Inside your main reducer add the `api` and `currentUser` reducers:

```js
import { combineReducers } from 'redux';
import { api, currentUser } from '@entando/apimanager';

export default combineReducers({
  api,
  currentUser,
});
```

The resulting state will be:

```js
{
  api: {
    useMocks: false,
    domain: null,
    updated: false,
  },
  currentUser: {
    username: null,
    token: null,
  }
}
```

In your index file or where you initialize the application you have to configure the `apiManager`:

```js
import { config, setApi } from '@entando/apimanager';
import { store } from 'state/store';

config(store, loginPage, landingPage);
store.dispatch(setApi({
  domain: process.env.DOMAIN,
  useMocks: process.env.USE_MOCKS,
}));
```

### config(store, loginPage, landingPage)

The `config()` method expect a redux store as the first parameter.
The store should contain both the `api` and `currentUser` reducers.

`loginPage` is the callback used to redirect the user to the login page when the `logoutUser()` action is being used.

`landingPage` is the callback used to redirect the user to the landing page when the `loginUser()` action is being used.

### setApi({domain: null, useMocks: true, pathPrefix: ''})

`setApi()` is used to switch the use of mocks on or off. `useMocks` can only be set to false if a domain is being passed.

`domain` has to be a valid domain main, which can omit the protocol. It is possible to add up to one directory, but the domain should not have trailing slashes.

`pathPrefix` is the prefix of the URL path of requests. This can be overriden by specifying a value for the `path` property of a request.

The `wasUpdated` selector will return a boolean to indicate whether or not the `setApi` action was successful.

---

## Login and Logout

This two actions have to be used when logging and logging out a user.
`apiManager` automatically handles token management and stores it also on the localStorage to persist the user information when the browser page is refreshed.

On top of that if any request returns either 401 or 403 status codes the package will logout the user and redirect him to the login page.

### loginUser(username, token)

`loginUser` expects both the username and the token that should be used for requests that require authentication.

This method stores also these credentials in the localStorage and redirects the user to the landing page previously setup when using `apiManager`'s `config()` method.

### logoutUser()

`logoutUser` clears the user credentials both from the state and localStorage and then redirects the user to the login page previously setup when using `apiManager`'s `config()` method.

---

## API Requests
Api requests are being done using any of the `apiManager` available methods:

- `makeRequest` automatically checks the current configuration and either makes a real or mock request depending on the value of the `api.useMocks` state. This should be the method always being used.
- `makeRealRequest` makes the request always againsts the API
- `makeMockRequest` makes the request always against the mock. This method should only be used when the corresponding API has not been developed yet.

Each method accepts the same arguments: a `request` object and a `page` object.

the `apiManager` also exports a `METHODS` constant containing all the available verbs (POST, PUT, DELETE, GET and PATCH).

### Request Object

The request object has the following properties:

```js
{
  path: '',
  uri: '/api/myApi',
  method: METHODS.POST,
  mockResponse: BODY_OK,
  contentType: 'application/x-www-form-urlencoded',
  headers: {
    'Other-Stuff': 'my-stuff',
  },
  body: {
    username: 'admin',
    password: 'admin',
  },
  errors: () => getErrors(username, password),
  useAuthentication: true,
}
```

#### uri
is the relative uri of the API.
The `apiManager` will append this to the `api.domain` set in the api state.
query strings shoud be part of the uri.

#### method
only values contained in the `@entando/apiManager METHODS` constant are valid.

#### mockResponse
the string used when a mock request is being made.
This body should only return the content of the expected payload.
If an array is being returned the `responseFactory` will automatically generate a paginated response based on the `page` object.

#### contentType [optional]
the default value is `application/json` but it can be overwritten.

#### headers [optional]
additional headers sent with the request.

#### body [optional]
this object is only being submitted as part of the request if it is either a POST or a PUT.

#### errors [optional]
this callback is returning an array of error messages.
When a mock request is being made this callback is being called and an error will be returned if this function returns anything but an empty array.

#### useAuthentication [optional]
if the value of this property is set as true the `apiManager` will append the token to the request headers.

If no token can be found on the system an automatic redirect will be fired and a promise containing only an `ok` and `status` property will be returned.

### Page Object
the page object is only used when pagination is needed and only has two parameters:

```js
{
  page: 1,
  pageSize: 10,
}
```

#### page
the current page requested.

#### pageSize
the maximum number of items that each page should contain.

---

## Throws

`apimanager` automatically checks if the returned response is not a 500, is of content-type json and that the token is not expired.

If any of these happen the library will add a toast using the `@entando/messages` package and throw an error that can be caught in the actual method using `makeRequest` or `makeRealRequest`.

The errors being thrown are either:

- noJsonReturned
- permissionDenied
- serverError
