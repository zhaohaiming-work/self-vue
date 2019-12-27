const express = require('express')
const path = require('path')
const webpack = require('webpack')
// const console = require('./console')
const webpackConfig = require('./webpack.config')
// const project = require('../project.config')
const compress = require('compression')
const app = express()
app.use(compress())
if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(webpackConfig)
  console.info('Enabling webpack development and HMR middleware')
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: path.resolve(__dirname, '../src'),
    hot: true,
    quiet: false,
    noInfo: false,
    lazy: false,
    stats: { colors: true }
  }))
  app.use(require('webpack-hot-middleware')(compiler, {
    path: '/__webpack_hmr',
    reload: true
  }))

  app.use(express.static(path.resolve(__dirname, '../public')))
  app.use('*', function (req, res, next) {
    const filename = path.join(compiler.outputPath, 'index.html')
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err)
      }
      res.set('content-type', 'text/html')
      res.send(result)
      res.end()
    })
  })
} else {
  console.warn(
    'Server is being run outside of live development mode, meaning it will ' +
    'only serve the compiled application bundle in ~/dist. Generally you ' +
    'do not need an application server for this and can instead use a web ' +
    'server such as nginx to serve your static files. See the "deployment" ' +
    'section in the README for more information on deployment strategies.'
  )
}

app.listen(9000, () => {
  console.log('服务器启动成功')
})
