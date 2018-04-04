const path = require('path');
const srcPath = path.resolve(__dirname, 'modules');

module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb",
  "rules": {
    "strict": 0,
    "import/no-extraneous-dependencies": "off",
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
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
