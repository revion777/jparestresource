require('babel-register')({
   presets: [ 'es2015' ] // transpilation
});

const config = require('./config').default;

const webpack = require('webpack');
const path = require('path');

const DashboardPlugin = require('webpack-dashboard/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const env = config.get('env') || 'development';
const isProduction = env === 'production';
const publicPath = config.get('project_public_path') || '/';
const buildDir = path.join(__dirname, config.get('dir_build'));
const srcDir = path.join(__dirname, config.get('dir_src'));
const publicDir = path.join(__dirname, config.get('dir_public'));
const webpackPort = config.get('webpack_port') || 4000;

// Common plugins
const plugins = [
  // new webpack.optimize.ModuleConcatenationPlugin(),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: Infinity,
    filename: 'vendor-[hash:8].js',
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(env),
      PROJECT_PATH: JSON.stringify(publicPath),
    },
  }),
  new webpack.NamedModulesPlugin(),
  new HtmlWebpackPlugin({
    template: path.join(publicDir, 'index.html'),
    favicon: path.join(publicDir, 'favicon.ico'),
    path: buildDir,
    filename: 'index.html',
  }),
  new webpack.LoaderOptionsPlugin({
    options: {
      postcss: [
        autoprefixer({
          browsers: [
            'last 3 version',
            'ie >= 10',
          ],
        }),
      ],
      context: srcDir,
    },
  }),
];

// Common rules
const rules = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loader: "eslint-loader",
    enforce: "pre",
    options: {
      quiet: true,
      failOnError: isProduction,
      failOnWarning: isProduction,
      emitError: false,
      emitWarning: true
    }
  },
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ["es2015", "react"],
        plugins: [
          require('babel-plugin-transform-object-rest-spread'),
          require('babel-plugin-transform-class-properties'),
          require('babel-plugin-transform-async-to-generator'),
        ]
      }
    }
  }
];

if (isProduction) {
  // Production plugins
  plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      output: {
        comments: false,
      },
    }),
    new ExtractTextPlugin('styles.[hash:8].css')
  );

  // Production rules
  rules.push({
    test: /semantic\.min\.css$/,
    loader: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: 'css-loader',
    }),
  });
  rules.push({
    test: /\.css$/,
    exclude: /semantic\.min\.css$/,
    loader: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: 'css-loader?modules&importLoaders=1&localIdentName=[hash:base64:8]!postcss-loader',
    }),
  });
  rules.push({
    test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
    use: "file-loader?name=files/[name].[hash:8].[ext]",
  });
} else {
  // Development plugins
  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new DashboardPlugin()
  );

  // Development rules
  rules.push({
    test: /semantic\.min\.css$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
      },
    ],
  });
  rules.push({
    test: /\.css$/,
    exclude: /semantic\.min\.css$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: true,
          localIdentName: '[path][name]__[local]--[hash:base64:5]',
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins: function () {
            return [
              require('autoprefixer'),
            ];
          }
        }
      }
    ],
  });
  rules.push({
    test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
    use: "file-loader?name=files/[name].[hash:8].[ext]",
  });
}

module.exports = {
  devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
  context: srcDir,
  entry: {
    js: './index.js',
    vendor: config.get('vendor_dependencies'),
  },
  output: {
    path: buildDir,
    filename: "bundle-[hash:8].js",
  },
  module: {
    rules,
  },
  resolve: {
    extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      srcDir,
    ],
  },
  plugins,
  devServer: {
    contentBase: isProduction ? buildDir : srcDir,
    historyApiFallback: true,
    port: webpackPort,
    compress: isProduction,
    inline: !isProduction,
    hot: !isProduction,
    host: '0.0.0.0',
    proxy: publicPath === '/' ? {} : {
      [publicPath]: {
        target: `http://localhost:${webpackPort}`,
        pathRewrite: {["^" + publicPath]: ""},
      }
    },
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: true,
      colors: {
        green: '\u001b[32m',
      },
    },
  },
};
