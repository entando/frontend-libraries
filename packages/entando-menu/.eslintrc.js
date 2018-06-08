const path = require('path');
const srcPath = path.resolve(__dirname, 'modules');

module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb",
  "rules": {
    "strict": 0,
    "import/no-extraneous-dependencies": "off",
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "jsx-a11y/anchor-is-valid": "off"
  },
  "settings": {
    "import/resolver": {
      "node": {
        "moduleDirectory": [
          "node_modules",
          "modules",
          "test",
          "sass"
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
