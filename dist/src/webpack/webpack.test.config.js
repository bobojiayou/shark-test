"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const webpack = require("webpack");
const DefinePlugin = require('webpack/lib/DefinePlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
/* const ProgressBarPlugin = require('progress-bar-webpack-plugin');
 */ /* const ngtools = require('@ngtools/webpack');
*/ const ExtractTextPlugin = require('extract-text-webpack-plugin');
const test_config_1 = require("../config/test-config");
const config = test_config_1.getWebpackTestConfig();
// --mock test confg start
const rootPath = config.projectRoot;
// console.log('webpack config', config);
// --mock test confg end
exports.webpackTestConfig = {
    devtool: 'inline-source-map',
    entry: {
        main: path.resolve(rootPath, config.basePath, config.main),
        polyfills: [path.resolve(rootPath, config.basePath, config.polyfills)]
    },
    output: {
        path: path.resolve(rootPath, '../', 'build', 'app'),
        filename: '[name].js',
        chunkFilename: 'js/chunk-[id].js',
        publicPath: '/'
    },
    resolveLoader: { modules: ['node_modules'] },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [{
                        loader: 'awesome-typescript-loader',
                        query: {
                            compilerOptions: {
                                /**
                                 * Remove TypeScript helpers to be injected
                                 * below by DefinePlugin
                                 */
                                removeComments: true
                            }
                        },
                    },
                    'angular2-template-loader',
                    'angular2-router-loader'
                ],
                exclude: [/\.e2e\.ts$/]
                // exclude: [/\.(e2e|spec)\.ts$/]
            },
            {
                test: /\.(js|ts)$/, loader: 'istanbul-instrumenter-loader',
                options: { esModules: true },
                enforce: 'post',
                exclude: [
                    /\.(e2e|spec)\.ts$/,
                    /node_modules/
                ]
            }, {
                test: /\.html$/,
                loader: 'html-loader'
            }, {
                test: /\.(png|ttf|eot|woff|woff2|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    name: 'img/[name].[ext]',
                    limit: 100
                }
            }, {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            }, {
                test: /\.scss$/,
                exclude: [
                    path.resolve(rootPath, config.basePath, config.componentPath)
                ],
                // loader: 'style-loader!css-loader?sourceMap!sass-loader?sourceMap' // 先加载css，会引起js计算的bug
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader!sass-loader'
                }) // ExtractTextPlugin不支持热替换（https://segmentfault.com/q/1010000008716379）
            }, {
                test: /\.scss$/,
                include: [
                    path.resolve(rootPath, config.basePath, config.componentPath)
                ],
                loaders: [
                    'to-string-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }, {
                test: /\.ejs$/,
                loader: 'ejs-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
        modules: [rootPath, 'node_modules']
    },
    plugins: [
        /* new ProgressBarPlugin(), */
        /*         new webpack.HotModuleReplacementPlugin(),
         */ new webpack.NoEmitOnErrorsPlugin(),
        new DefinePlugin({
            'ENV': '"dev"'
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(rootPath, config.basePath, config.indexTemplate)
        }),
        new ExtractTextPlugin('css/[name].css'),
        /* new ngtools.AotPlugin({
            skipCodeGeneration: true, // 默认false. false：使用AoT ; true：不使用AoT
            tsConfigPath: path.resolve(rootPath, '../', 'tsconfig.json')
        }), */
        new AddAssetHtmlPlugin([{
                filepath: require.resolve(path.resolve(rootPath, 'dll', 'angular.dll.js'))
            }]),
        new webpack.DllReferencePlugin({
            context: path.resolve(rootPath),
            manifest: require(path.resolve(rootPath, 'dll', 'angular-manifest.json'))
        })
    ]
};
//# sourceMappingURL=/Users/bobo/Work/test/shark-test/src/webpack/webpack.test.config.js.map