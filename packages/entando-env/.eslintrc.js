const path = require('path');
const srcPath = path.resolve(__dirname, 'modules');

module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb/base",
  "rules": {
    "strict": 0,
    "import/no-extraneous-dependencies": "off",
    "no-floating-decimal": "off",
  },
  "settings": {
    "import/resolver": {
      "node": {
        "moduleDirectory": [
          "node_modules",
          "modules"
        ]
      }
    }
  },
  "env": {
    "browser": true,
    "node": true,
    "jest": true
  }
};
