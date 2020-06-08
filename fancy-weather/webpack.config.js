const path = require('path');
// require('babel-polyfill');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const MomentTimezoneDataPlugin = require('moment-timezone-data-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: ['babel-polyfill', './src/index.js'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        port: 4200
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            icon: "./src/assets/img/tools/favicon-32x32.png"
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, "src/assets/img"),
                to: path.resolve(__dirname, "dist/assets/img")
            }
        ]),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: ["babel-loader", "eslint-loader"]
                // use: ["babel-loader"]
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(jpg|png|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        // options: {
                        //     name: "images/[name][hash].[ext]"
                        // }
                    }
                ]
            },
        ]
    }
}