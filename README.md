# frontend-libraries

Common Libraries used in Entando frontend applications.

## Setup

`node 9.10.1` and `npm 5.6.0` are the minimum requirements.

To install the dependencies use the command `npm run bootstrap`

## Scripts

every single script is executed using `npm run <scriptName>`

### bootstrap
installs every dependency using `lerna`

### clean
cleans the `node_modules` directories

### test
tests every single package

### lint
lints every single package

### publish
command used to publish on `npm` the latest versions of the libraries

---

## Available Packages:

- `router`: used for routing within redux
- `utils`: common utilities
- `apimanager`: used to handle api calls
- `ddtable`: table with draggable rows
- `menu`: core menu elements used across Entando applications
- `messages`: states used to manage toasts and errors
- `pages`: common pages used across Entando applications

---

## Dev Environment

Due to hoisting tests in packages may no pass because the single package dependencies are installed both on the actual package and on the entire project, duplicating instances of React.

The recommended procedure is to run `npm run clean` to purge the *node_modules* directories and `npm run bootstrap` to regenerated them.

It is also considered bad practice committing lock files of the single packages.
