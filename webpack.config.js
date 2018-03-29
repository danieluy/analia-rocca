const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env) => {
  const config = {
    entry: {
      bundle: path.join(__dirname, '/src/index.js')
    },
    output: {
      filename: '[name].js',
      path: path.join(__dirname, '/public/js/'),
    },
    module: {
      loaders: [
        {
          rules: [
            {
              test: /\.css$/,
              use: [
                { loader: 'style-loader' },
                { loader: 'css-loader' },
                { loader: 'postcss-loader', options: { plugins: () => [autoprefixer] } }
              ]
            },
            {
              test: /\.scss$/,
              use: [
                { loader: 'style-loader' },
                { loader: 'css-loader' },
                { loader: 'postcss-loader', options: { plugins: () => [autoprefixer] } },
                { loader: 'sass-loader' }]
            },
            {
              test: /\.(jpe?g|png|gif|svg)$/i,
              use: [
                'url-loader?limit=10000',
                'img-loader'
              ]
            }
          ]
        },
        {
          loader: 'babel-loader',
          include: [
            path.join(__dirname, '/src/')
          ],
          exclude: /(node_modules|bower_components)/,
          test: /\.jsx?$/,
          query: {
            presets: ['env', 'react']
          }
        },
      ]
    }
  };
  if (env.development) {
    config.devtool = 'inline-source-map';
  }
  if (env.production) {
    config.plugins = [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new UglifyJsPlugin({})
    ];
  }
  return config;
};
