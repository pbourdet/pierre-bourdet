module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "parser": "@babel/eslint-parser",
    "extends": [
        "plugin:react/recommended",
        "standard"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "indent": ["error", 4],
        "semi": ["error", "always"],
    },
    "overrides": [
        {
            "files": [
                "**/*.test.js",
                "**/*.test.jsx"
            ],
            "env": {
                "jest": true
            }
        }
    ],
    "settings": {
        "react": {
            "version": "detect"
        },
    }
};
