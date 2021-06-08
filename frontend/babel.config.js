module.exports  = function(api) {
    api.cache(true);

    const config = {
      plugins: [
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-transform-runtime",
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-optional-chaining"
      ],
      presets: [
        "@babel/preset-env",
      ]
    }

    return config
}
