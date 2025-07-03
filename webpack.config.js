const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
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
                }
            },
            {
                test: /\.(png|jpe?g|gif|webp)$/i,
                type: 'asset/resource',
                generator: {
                    filename: '../img/[name][ext]?[contenthash]'
                },
                use: [
                    {
                        loader: 'responsive-loader',
                        options: {
                            adapter: require('responsive-loader/sharp'),
                            name: 'img/[name]-[width]w.[ext]?[hash]',
                            sizes: [1260, 2520], // Основной размер и 2x для Retina
                            quality: 95,
                            formats: ['webp', 'png'], // Генерируем WebP и PNG
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 95
                            },
                            webp: {
                                quality: 95
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