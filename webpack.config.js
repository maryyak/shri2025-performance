const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'assets/[hash][ext][query]',
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-react', { runtime: 'automatic' }]
                        ],
                        plugins: ['@babel/plugin-syntax-dynamic-import']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                            esModule: false
                        }
                    },
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    require('autoprefixer'),
                                    require('cssnano')({ preset: 'default' })
                                ]
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg|webp)$/i,
                type: 'asset/resource',
                generator: {
                    filename: '../img/[name][ext]?[contenthash]'
                },
                use: [
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 95
                            },
                            optipng: {
                                enabled: false
                            },
                            pngquant: false,
                            webp: {
                                quality: 95,
                                lossless: true
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            chunkFilename: '[id].[contenthash].css'
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            inject: 'head',
            scriptLoading: 'defer',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true
            }
        })
    ],
    optimization: {
        minimizer: [
            '...',
            new CssMinimizerPlugin(),
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    compress: { drop_console: true },
                    format: { comments: false }
                },
                extractComments: false
            })
        ],
        usedExports: true,
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors'
                }
            }
        },
        runtimeChunk: 'single'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
};