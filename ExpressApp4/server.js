var webpack = require('webpack');
var config = require('./webpack.config');
var app = new require('express')();
require('node-jsx').install({ extension: '.js', harmony: true });

var debug = require('debug')('ExpressApp4');

var compiler = webpack(config);
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

var port = process.env.PORT || 3000;
if (process.env.NODE_ENV === 'production') {
  port = 3000;
}

app.use(function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.listen(port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
  }
});
