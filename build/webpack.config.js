const path = require('path')
const HtmlTmpl = require('html-webpack-plugin')
const webpack = require('webpack')
const config = {
  mode: 'development',
  entry: {
    polyfill: 'babel-polyfill',
    main: [path.join(__dirname, '../src/main.js')],
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'js/[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              comments: false,
              presets: [['@babel/preset-env']],
              plugins: [
                '@babel/plugin-syntax-dynamic-import',
                '@babel/plugin-proposal-export-default-from',
                '@babel/plugin-transform-runtime',
              ]
            }
          }
        ]
      }
    ]
  },
  resolve: {
    modules: ['node_modules', path.join(__dirname, '../src'),],
    extensions: ['*', '.js']
  },
  plugins: [
    new HtmlTmpl({
      template: path.join(__dirname, '../src/index.html'),
      inject: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
  devtool: 'cheap-eval-source-map'
}
config.entry.main.unshift(`webpack-hot-middleware/client.js?path=http://localhost:9000/__webpack_hmr`);

module.exports = config