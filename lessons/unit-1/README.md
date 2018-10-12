# Unit 1

> **Dependencies**: We need to have installed NodeJS, yarn and create-react-app.

This unit contains the base project structure.

## Steps

### Scaffolding

We have created our project scaffolding using [`create-react-app`](https://github.com/facebook/create-react-app)

```$ npx create-react-app PROJECT_NAME```

> Note one important fact about this is we can use some ES6 features, like class fields and static properties. See [Supported Language Features and Polyfills](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#supported-language-features)

Update the `package.json` file with some information about project details (like author, contributors, descriptions, keywords, etc).

### Development dependencies

We encourage you install the next browser extensions while developing, they will help you to better understand what `react` and `redux` are doing under the hood.

- [`react-devtools`](https://github.com/facebook/react-devtools): React browser extension.
- [`redux-devtools-extension`](https://github.com/zalmoxisus/redux-devtools-extension): Redux browse extension to see redux actions.

### Linting

For a more heterogenous code we have configured the [`eslint`](https://eslint.org/) tool in our project applying the rules defined by AirBnB in [`eslint-config-airbnb`](https://www.npmjs.com/package/eslint-config-airbnb). Because of this, we have created the `.eslintrc` file, defining we are inheriting the set of rules specified by AirBnB and also we have overriden the configuration for some rules under the `rules` property.

> We have used [Visual Code Editor](https://code.visualstudio.com), which automatically recognized eslint configuration and lint our code while editing.
> It is a better idea to define a new script entry in your `package.json` to run the linting manually before made any commit and, much better, use a tool like [`husky`](https://www.npmjs.com/package/husky) to automatically force running the linting before apply any commit.

