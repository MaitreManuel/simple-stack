const CleanTerminalPlugin = require('clean-terminal-webpack-plugin');
const DotEnv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const path = require('path');
const webpack = require('webpack');

const nodeModules = path.resolve(__dirname, 'node_modules');

const config = {
  cache: true,
  devtool: 'source-map',
  entry: './client/index.js',
  output: {
    chunkFilename: '[name].[chunkhash].js',
    filename: '[name].[contenthash].js',
    library: '[name]',
    path: path.resolve('./client/dist')
  },
  devServer: {
    liveReload: false,
    port: 3000,
    watchFiles: [
      'client/dist/**/*.css',
      'client/dist/**/*.js',
    ],
  },
  module: {
    rules: [
      {
        // Requis pour la syntaxe JavaScript ES6
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env']
          }
        }
      }, {
        // Requis pour faire du Vue.js
        test: /\.vue$/,
        exclude: /node_modules/,
        use: {
          loader: 'vue-loader'
        }
      }, {
        // Requis pour importer du SASS/SCSS en JS
        test: /\.s(a|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: ''
            }
          }, {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true
            }
          }, {
            loader: 'resolve-url-loader',
            options: {
              attempts: 1,
              sourceMap: true
            }
          }, {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: [
                  nodeModules
                ]
              },
              sourceMap: true
            }
          }
        ]
      }, {
        // Requis pour importer du CSS dans du JS
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: ''
            }
          }, {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          }, {
            loader: 'resolve-url-loader',
            options: {
              attempts: 1,
              sourceMap: true
            }
          }
        ]
      }, {
        // Utilisé pour les icônes Bootstrap
        test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          prefix: 'font/',
          limit: 5000,
          mimetype: 'application/font-woff'
        }
      }, {
        test: /\.(ttf|eot|svg|otf|gif)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          prefix: 'font/'
        }
      }, {
        // Requis pour supporter les images dans du style
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 30000,
              name: '[name].[ext]?[hash]'
            }
          }
        ]
      }, {
        test: /\.(mp3|ogg|aac|flac)$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          chunks: 'all',
          minSize: 0,
          name: 'custom_vendors',
          test: /[\\/]assets[\\/]custom-libs[\\/]/
        },
        vendor: {
          chunks: 'all',
          name: 'node_vendors',
          test: /[\\/]node_modules[\\/]/
        }
      }
    }
  },
  plugins: [
    // Rajoute un plugin pour débug plus facilement une erreur de configuration
    new webpack.LoaderOptionsPlugin({
      debug: false
    }),
    // Arrête de recharger s'il y a une erreur évitant un Red Screen Of Death
    new webpack.NoEmitOnErrorsPlugin(),
    // Nettoie la console avant l'affichage du build
    new CleanTerminalPlugin(),
    // Accède au fichier .env en front
    new DotEnv(),
    // Génère un fichier HTML avec les sources liées
    new HtmlWebpackPlugin({
      templateContent: `
        <html lang="fr">
          <body>
            <div id="vue-root"></div>
          </body>
        </html>
      `
    }),
    // Permet de séparer le CSS importé dans du JS dans un fichier transpilé CSS
    new MiniCssExtractPlugin({
      chunkFilename: '[name].[chunkhash].css',
      filename: '[name].[contenthash].css'
    }),
    new VueLoaderPlugin()
  ],
  resolve: {
    // Permet de simplifier l'appelle d'une ressource
    alias: {
      Class: path.resolve(__dirname, 'client/src/class'),
      Vue: path.resolve(__dirname, 'client/src/vue')
    }
  }
};

module.exports = config;
