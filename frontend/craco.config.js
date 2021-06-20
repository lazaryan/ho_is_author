const path = require('path')

require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') })

const cssName = 'HoIsAuthor.css'
const jsName = 'HoIsAuthor.js'

const findPlugin = (webpackConfig, pluginName) => {
  let plugin = null;
  let index = null;

  webpackConfig.plugins.map((plg, idx) => {
    if (plg.constructor.name == pluginName) {
      plugin = plg
      index = idx
    }
  })

  return [plugin, index]
}

const proxyUrls = [ '/login', '/register', '/api', '/static', '/general' ]

module.exports = {
  plugins: [
    { plugin: require('@semantic-ui-react/craco-less') },
  ],
  eslint: {
    configure: configEslint => {
      configEslint.parser = '@typescript-eslint/parser'

      return configEslint
    }
  },
  webpack: {
    configure: webpackConfig => {
      if (webpackConfig.mode === 'production') {
        const [css] = findPlugin(webpackConfig, 'MiniCssExtractPlugin')
        css.options.filename = cssName

        webpackConfig.optimization.runtimeChunk = false
        webpackConfig.optimization.splitChunks = {
          cacheGroups: { default: false }
        }

        webpackConfig.output.filename = jsName
      }

      return webpackConfig
    }
  },
  devServer: {
    hot: true,
    port: 8080,
    host: '0.0.0.0',
    proxy: {
      ...proxyUrls.reduce((acc, url) => (acc[url] = `http://localhost:${process.env.SERVER_PORT}`, acc), {})
    }
  }
}
