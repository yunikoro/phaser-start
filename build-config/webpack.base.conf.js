
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const devMode = process.env.NODE_ENV !== 'production'

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
    mode: 'development',
    context: path.resolve(__dirname, '../'),
    entry: {
       start: resolve('./src/index.js'),
       multScene: resolve('./src/multScene.js')
    },
    output: {
        filename: 'static/[name].[hash].js',
        path: resolve('dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: resolve('node_modules'),
                query: {
                    presets: ['@babel/preset-env']
                }
            },
            {
                test: /\.css$/,
                use: [
                  {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                      hmr: devMode,
                      publicPath: '../'
                    }
                  },
                  'css-loader'
                ],
            },
            {
                test: /\.(mp4|json|png|jpeg|jpg|ttf|html)$/,
                exclude: resolve('index.html'),
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: 'static/[name].[ext]',
                    },
                  }
                ]
            }
        ],
    },
    devtool: 'inline-source-map',
    devServer: {
        disableHostCheck: true,
        contentBase: false,
        host: '0.0.0.0',
        port: 80, 
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
          filename: devMode ? './static/[name].css' : './static/[name].[hash].css',
          chunkFilename: devMode ? './static/[id].css' : './static/[id].[hash].css',
        }),
        new HtmlWebpackPlugin({
          title: 'start',
          filename: 'index.html',
          template: 'index.html',
          chunks: ['start'],
          inject: true
        }),
        new HtmlWebpackPlugin({
          title: 'multScene',
          filename: 'mult-scene.html',
          template: 'index.html',
          chunks: ['multScene', 'vendors'],
          inject: true
        }),
    ]
}