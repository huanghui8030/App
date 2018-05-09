/**
 * 以下配置只是用于webpack 3.X 版本
 */
const path = require('path'),
    webpack = require('webpack'), 
    ExtractTextPlugin = require('extract-text-webpack-plugin'), //抽取css 
    CleanWebpackPlugin = require('clean-webpack-plugin'), //清除文件夹
    CopyWebpackPlugin = require('copy-webpack-plugin'); //拷贝文件

function resolve (dir) {
    return path.join(__dirname, dir);
}
module.exports = {
    entry: {
        common: './src/js/main.js',
        vendors: ['vue','mint-ui']
    },
    output: {
        path: path.join(__dirname, '/assets/js'),
        filename: "[name].js"
    },
    //devtool:'#source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader?minimize',
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.less/,
                use: ExtractTextPlugin.extract({
                    use: [
                        
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true
                            }
                        },
                        {
                            loader: 'autoprefixer-loader'
                        },
                        {
                            loader: 'less-loader',
                            options: {
                                strictMath: false,
                                noIeCompat: true,
                                sourceMap: false
                            }
                        }
                    ],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.(gif|png|svg)\??.*$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: 'images/[name].[ext]',
                            publicPath: '../'
                        }
                    }
                ]
            },
            {
                test: /\.(jpg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name].[ext]',
                            publicPath: '../'
                        }
                    }
                ]
            },
            {
                test: /\.(woff|eot|ttf)\??.*$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // limit: 1024,
                            name: 'font/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '../css/[name].css',
            disable: false,
            allChunks: false
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: 'vendors.js'
        }),
        new webpack.optimize.UglifyJsPlugin({
            comments: true,
            compress: {
                warnings: false
            }
        })
    ],
    resolve: {
        extensions: ['.js'],
        alias: {
          '@': resolve('src'),
          'vue': 'vue/dist/vue.js'
        }
    }
}