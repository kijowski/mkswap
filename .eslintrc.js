module.exports = {
  root: true,
  extends: 'standard',
  overrides: [{
    files: ["*.ts"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      tsconfigRootDir: __dirname,
      project: ["./tsconfig.json"]
    },
    plugins: ["@typescript-eslint"],
    extends: "standard-with-typescript",
    rules: {
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/restrict-template-expressions": ["error", { allowNumber: true }]
    }
  }]
};
