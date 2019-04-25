const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

const paths = {
  source: path.join(__dirname, 'src/ui'),
  dist: path.join(__dirname, 'dist')
};
const devMode = process.env.NODE_ENV !== 'production';
const styleLoader = devMode ? 'style-loader' : MiniCssExtractPlugin.loader;
const indexHtml = path.join(paths.source, 'index.html');

const entry = path.join(paths.source, 'index.jsx');

const devServer = {
  contentBase: paths.dist,
  compress: true,
  port: 9000,
  historyApiFallback: true,
  proxy: {
    '/api': 'http://localhost:8082'
  }
};

const mode = devMode ? 'development' : 'production';

const rules = [
  {
    test: /.(jsx?)$/,
    exclude: /node_modules/,
    use: ['babel-loader', 'eslint-loader']
  },
  {
    test: /.scss$/,
    use: [
      styleLoader,
      {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 1,
          localIdentName: '[name]__[local]:[hash:base64:5]',
          minimize: !devMode,
          sourceMap: !devMode
        }
      },
      {
        loader: 'sass-loader',
        options: {
          data: '@import "src/ui/styles/vars";'
        }
      }
    ]
  }
];

const output = {
  filename: 'app.js',
  path: paths.dist
};

const plugins = [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({ template: indexHtml })
];

const optimization = {
  minimizer: []
};

if (!devMode) {
  plugins.push(
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css'
    })
  );

  optimization.minimizer.concat([
    new OptimizeCSSAssetsPlugin({}),
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      sourceMap: false
    })
  ]);
}

const resolve = {
  extensions: ['.jsx', '.js'],
  modules: ['node_modules', 'src/ui', 'src/ui/components']
};

module.exports = {
  entry,
  mode,
  devServer,
  module: {
    rules
  },
  output,
  optimization,
  plugins,
  resolve
};
