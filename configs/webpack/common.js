// shared config (dev and prod)
const path = require('path');
const {resolve} = require('path');
const {CheckerPlugin} = require('awesome-typescript-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const WorkboxPlugin = require('workbox-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const bgColor =  '#eb51e1'

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  context: resolve(__dirname, '../../src'),
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader', 'source-map-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'awesome-typescript-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', { loader: 'css-loader', options: { importLoaders: 1 } }],
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'sass-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=img/[hash].[ext]',
          'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false',
        ],
      },
    ],
  },
  plugins: [
    new CheckerPlugin(),
    new HtmlWebpackPlugin({
    template: 'index.html.ejs', 
    bgColor: `${bgColor}`,
    title: 'React-Babylon, PWA, Sputnik Boiler Plate V0.1',
    meta: {
      'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
      // Will generate: <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      'theme-color': `${bgColor}`
      // Will generate: <meta name="theme-color" content="#4285f4">
    }}),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
    new WebpackPwaManifest({
      name: 'Sound-Harrier',
      short_name: 'Sound-Harrier PWA',
      description: 'Sound-Harrier babylonJS PWA webXR responsive experince',
      background_color: `${bgColor}`,
      start_url: '/',
      crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
      icons: [
        {
          src: path.resolve(`./src/assets/img/sputnik-sm.png`),
          sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
        },
        {
          src: path.resolve(`./src/assets/img/sputnik-lg.png`),
          size: '1024x1024', // you can also use the specifications pattern
        },
      ],
    }),
    new CopyPlugin([
      { from: resolve(__dirname, '../../src/assets/textures/'), to: resolve(__dirname, '../../dist/textures/') },
      { from: resolve(__dirname, '../../src/assets/models/'), to: resolve(__dirname, '../../dist/models/') },
    ]),
  ],
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
  },
  performance: {
    hints: false,
  },
};
