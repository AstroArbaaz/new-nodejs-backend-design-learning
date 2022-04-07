module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        "airbnb-base",
    ],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    rules: {
        quotes: ["error", "double"],
        indent: [1, 4],
        "linebreak-style": 0,
        "no-console": 0,
    },
};
