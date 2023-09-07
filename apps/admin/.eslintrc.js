module.exports = {
  root: true,
  extends: ["custom", "plugin:@next/next/recommended"],
  rules: {
    "@next/next/no-html-link-for-pages": 0,
    "import/order": [
      "error",
      {
        alphabetize: { order: "asc", caseInsensitive: true },
        "newlines-between": "always",
        pathGroups: [
          {
            pattern:
              "~{{assets,public,components,common,config,features,hoc,hooks,icons,layouts,pages,styles,services,context}/,graphql-api}**",
            group: "external",
            position: "after",
          },
        ],
        groups: ["builtin", "external", ["sibling", "parent"]],
      },
    ],
    "@typescript-eslint/unbound-method": 0,
    "@typescript-eslint/no-unnecessary-type-assertion": 0,
  },
};
