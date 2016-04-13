var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');

var isProduction = process.env.NODE_ENV === 'production';
var isDeveloping = !isProduction;
var port = isProduction ? (process.env.PORT || 8080) : 3000;

var app = express();
var compiler = webpack(config);

if (isDeveloping) {

	app.use(require('webpack-dev-middleware')(compiler, {
	  noInfo: true,
	  publicPath: config.output.publicPath
	}));
	
	app.use(require('webpack-hot-middleware')(compiler));

} else {
	app.use('/dist', express.static('dist'));
}

app.use(express.static('src/assets'));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:' + port);
});
