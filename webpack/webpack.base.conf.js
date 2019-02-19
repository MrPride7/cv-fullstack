const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMerge = require('webpack-merge');
const PATHS = {
    app: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'build')
}

module.exports = {
    entry: {
        app: PATHS.app + '/index.js'
    },
    output: {
        path: PATHS.build,
        filename: '[name].js'
    },
    module: {
    rules: [
        {
            test: /\.(sa|sc|c)ss$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader'
                },
                {
                    loader: 'postcss-loader',
                    options: {config: { path: 'src/js/postcss.config.js' } }
                },
                {
                    loader: 'sass-loader'
                }
            ],
        }
    ]},
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new HtmlWebpackPlugin ({
            filename: 'Webpack app'
        })
    ]
};