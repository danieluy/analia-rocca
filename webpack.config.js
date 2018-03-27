const webpack = require('webpack');
const path = require('path');

module.exports = (env) => {
  const config = {
    entry: {
      bundle: path.join(__dirname, '/src/index.js'),
    },
    output: {
      filename: '[name].js',
      path: path.join(__dirname, '/build/'),
    },
    module: {
      loaders: [
        {
          rules: [
            {
              test: /\.css$/,
              use: ['style-loader', 'css-loader'],
            },
            {
              test: /\.scss$/,
              use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
              test: /\.(jpe?g|png|gif|svg)$/i,
              use: [
                'url-loader?limit=10000',
                'img-loader'
              ]
            }
          ],
        },
        {
          loader: 'babel-loader',
          include: [
            path.join(__dirname, '/src/'),
          ],
          test: /\.jsx?$/,
          query: {
            presets: ['es2015', 'react'],
          },
        },
      ],
    },
  };
  if (env.development) {
    config.devtool = 'inline-source-map';
    config.devServer = {
      contentBase: './build/',
      port: env.PORT || 3000,
    };
    // config.module.loaders.push({
    //   test: /\.jsx?$/,
    //   enforce: 'pre',
    //   loader: 'eslint-loader',
    //   include: path.join(__dirname, 'src'),
    //   options: {
    //     emitWarning: true,
    //   }
    // })
  }
  if (env.production) {
    config.plugins = [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: true,
        },
      }),
      new webpack.optimize.AggressiveMergingPlugin(),
    ];
  }
  return config;
};
