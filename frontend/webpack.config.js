
const yargs = require('yargs').argv
const HtmlWebpackPlugin = require('html-webpack-plugin') // shell template autogeneration
const WebpackRequireFrom = require('webpack-require-from') // use to build dynamic modules CDN path
const CircularDependencyPlugin = require('circular-dependency-plugin')
const bodyParser = require('body-parser')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const BundleAnalyzerPlugin  = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const glob = require('glob')
const webpack = require('webpack')
const MomentLocalesPlugin = require('moment-locales-webpack-plugin')

const fs = require('fs')
const path = require('path')

const react_path = path.resolve('./src/react')
const apps_path = path.resolve(`${react_path}/src`)
const output_path = path.resolve('../build/main')
const is_analyzer = yargs.analyzer
const is_mocking = yargs.mock

const mode = process.env.NODE_ENV = yargs.mode || 'development'

const hot = yargs['$0'].includes('webpack-dev-server')
    
const entry = `${apps_path}/index.js`

const bundleFile = 'bundle.js'

const output = {
    path: `${output_path}/js`,
    filename: bundleFile,
    publicPath: '/',
    chunkFilename: 'chunks/[id].[chunkhash].js'
}

const HtmlWebpackPluginOptionsFactory = app => Object.assign(
    {
        inject: false,
        template: `pug-loader!${react_path}/template.pug`,
        hot,
        app: `/static/main/js/${bundleFile}`,
        meta: {
            viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
        },
        baseUrl : ''
    }, hot ?
    {
        inject: true
    } :
    {
        filename: `${output_path}/index.html`
    }
)

const plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ["chunks/*"] }),
    new webpack.ProvidePlugin({
        React: 'react',
        ReactDOM: 'react-dom'
    }),
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true,
      cwd: process.cwd(),
    }),
    new MomentLocalesPlugin({
        localesToKeep: ['es-us', 'ru'],
    }),
      ...(typeof entry == 'string' ? [entry] : Object.keys(entry))
          .map(app => new HtmlWebpackPlugin(HtmlWebpackPluginOptionsFactory(app)))
]

!hot && plugins.push(
    new WebpackRequireFrom({
      variableName: 'window.staticsURL' // Used to dynamically pull static files
    })
)

is_analyzer && plugins.push(new BundleAnalyzerPlugin())

module.exports = {
    mode,
    entry,
    output,
    plugins,
    module: {
        rules: [            
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader', 
                    {
                        loader: 'eslint-loader',
                        options: {
                            quiet: true
                        }
                    }
                ],        
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader', 
                    'ts-loader',
                    {
                        loader: 'eslint-loader',
                        options: {
                            quiet: true
                        }
                    }
                ], 
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
        alias: {
            utils: path.resolve(react_path, './utils.ts'),
            ui: path.resolve(react_path, 'ui'),
            root: path.resolve(react_path),
            components: path.resolve(apps_path),
            theme: path.resolve(react_path, 'ui/theme/index.ts')
        }
    },
    externals: hot && {} || {
        'react': 'React',
        'react-dom': 'ReactDOM',
    },
    devServer: {
        contentBase: './',
        hot: true,
        overlay: true,
        disableHostCheck: true,
        historyApiFallback: true,
        before(app) {
            if (is_mocking) {
                const mock = fs.existsSync(`${apps_path}/mock.js`) && require(`${apps_path}/mock.js`)
  
                mock && Object.entries(mock).map(
                    ([method, paths]) => Object.entries(paths).map(([path, mock]) =>
                        app[method](path, bodyParser.json(), (req, res) => setTimeout(() => res.json(mock(req)), 1000 /* artificial delay */))
                    )
                )
            }
        }
    }
};