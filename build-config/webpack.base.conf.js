
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

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
        filename: '[name].[hash].js',
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
                  'style-loader',
                  'css-loader'
                ],
            },
            {
                test: /\.(mp4|json|png|jpeg|jpg)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[name].[ext]',
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
          chunks: ['multScene'],
          inject: true
        }),
    ]
}