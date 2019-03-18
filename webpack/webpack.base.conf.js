const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    assets: 'assets/'
}

module.exports = {
    // BASE config
    externals: {
        paths: PATHS
    },
    entry: {
        app: PATHS.src
    },
    output: {
        filename: `${PATHS.assets}js/[name].js`,
        path: PATHS.dist,
        publicPath: '/'
    },
    module: {
    rules: [
        {
            test: /\.pug$/,
            loader: 'pug-loader',
            options: {
                pretty: true
            }
        },
        {
            test: /\.(woff|woff2|eot|ttf|svg)$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                outputPath: `${PATHS.assets}fonts/`
            }
        },
        {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]'
            }
        },
        {
            test: /\.(sa|sc|c)ss$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {sourceMap: true}
                },
                {
                    loader: 'postcss-loader',
                    options: {sourceMap: true, config: { path: `${PATHS.src}/js/postcss.config.js` } }
                },
                {
                    loader: 'sass-loader',
                    options: {sourceMap: true}
                }
            ],
        }
    ]},
    plugins: [
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}css/[name].css`,
        }),
        new HtmlWebpackPlugin({
            hash: false,
            template: `${PATHS.src}/index.pug`,
            filename: './index.html'
        }),
        new CopyWebpackPlugin([
            { from: `${PATHS.src}/img`, to: `${PATHS.assets}img` },
        ])
    ]
};