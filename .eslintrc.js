module.exports = {
  parser: "@babel/eslint-parser",
  parserOptions: {
    requireConfigFile: false,

    babelOptions: {
      presets: ["@babel/preset-react"],
    },
  },
};
