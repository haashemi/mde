const { init } = require("@fullstacksjs/eslint-config/init");

module.exports = init({
  modules: {
    react: true,
    next: true,
    typescript: { parserProject: true, resolverProject: "./tsconfig.json" },
    strict: true,
    import: true,
    esm: true,
    prettier: true,
    tailwind: true,
  },
  rules: {
    "fp/no-nil": "off", // Disabled because of useEffect
    "fp/no-unused-expression": "off", // Disabled because of useEffect
  },
});
