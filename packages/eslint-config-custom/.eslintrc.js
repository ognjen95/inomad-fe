/** @type {import("eslint").ESLint.ConfigData} */
module.exports = {
  extends: [
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:@next/next/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:prettier/recommended",
    "turbo",
  ],
  plugins: ["react", "import"],
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  parserOptions: {
    project: [
      "./tsconfig.json",
      "./apps/*/tsconfig.json",
      "./packages/*/tsconfig.json",
    ],
  },
  rules: {
    "global-require": 0,
    "react/react-in-jsx-scope": 0,
    "react/no-unescaped-entities": 0,
    "react/prop-types": 0,
    "react/require-default-props": 0,
    "react/jsx-props-no-spreading": 0,
    "react/no-array-index-key": 0,
    "@typescript-eslint/no-floating-promises": 0,
    "import/prefer-default-export": 0,
    "react/no-unstable-nested-components": ["error", { allowAsProps: true }],
    "react/function-component-definition": [
      2,
      { namedComponents: "arrow-function" },
    ],
    "no-underscore-dangle": 0,
    "no-param-reassign": [
      "error",
      {
        props: true,
        ignorePropertyModificationsFor: ["state", "ctx", "session", "token"],
      },
    ],
    "import/no-extraneous-dependencies": ["error", { includeInternal: true }],
    "import/order": [
      "error",
      {
        alphabetize: { order: "asc", caseInsensitive: true },
        "newlines-between": "always",
        pathGroups: [
          {
            pattern:
              "~{{assets,public,components,common,config,features,hoc,hooks,icons,layouts,pages,styles,test-utils,ui-components}/,graphql-api}**",
            group: "external",
            position: "after",
          },
        ],
        groups: ["builtin", "external", ["sibling", "parent"]],
      },
    ],
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: false,
      },
    ],
    "@typescript-eslint/no-non-null-assertion": 0,
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        ts: "never",
        tsx: "never",
        "": "never",
      },
    ],
    "jsx-a11y/anchor-is-valid": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "jsx-a11y/label-has-associated-control": 0,
    "react/jsx-key": [2, { warnOnDuplicates: true }],
    "arrow-body-style": ["error", "as-needed"],
    "@next/next/no-html-link-for-pages": 0,
  },
};
