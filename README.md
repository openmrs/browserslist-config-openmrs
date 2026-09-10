# browserslist-config-openmrs

The [browserslist](https://github.com/browserslist/browserslist) supported by OpenMRS. this is used by tools like
[@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env) and [autoprefixer](https://github.com/postcss/autoprefixer) to ensure
that our frontend code at OpenMRS is compiled to work in the browsers we support.

## Notes

- This list of browsers was determined as part of OpenMRS' RFC process. [More info](https://github.com/openmrs/openmrs-rfc-frontend/blob/master/text/0003-browser-support.md).
- You must use `@babel/preset-env` and/or `autoprefixer` in order for your code's compilation to target the correct browsers.
- See [this file](src/browserslist-config-openmrs.js) to see which browsers are supported.
- The tests check the RFC policy and loading the package through a consumer's Browserslist configuration.
  The concrete browser versions depend on the resolver and browser data used by each build tool.
- If you're using [css-loader](git@github.com:webpack-contrib/css-loader.git), be sure to use at least version 1.0.0, which has support for shareable browserslist config files.

## Installation

```sh
npm install --save-dev browserslist-config-openmrs
```

## Usage

In your package.json, create a `"browserslist"` property that extends the openmrs config. Read [here](https://github.com/browserslist/browserslist#shareable-configs) for more details.

```json
{
  "browserslist": ["extends browserslist-config-openmrs"]
}
```

In your .babelrc, add 'babel-preset-env'. You do not need to add any config options to it in here because babel-preset-env uses browserslist which already looks at your package.json's "browserslist" config by default.

```js
{
  presets: ["@babel/preset-env"];
}
```
