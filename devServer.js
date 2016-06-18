var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

var port = 3000;
var ip = '0.0.0.0';
new WebpackDevServer(webpack(config), {
  hot: true,
  publicPath: config.output.publicPath,
  historyApiFallback: true,
}).listen(port, ip, (err) => {
  if(err) {
    throw err;
  }

  console.log(`listening on port: ${port}`); // eslint-disable-line no-console
});

