const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
    mode: 'development',
    entry: {
        app: path.resolve(__dirname,'src/index.js')
    },
    module: {
        rules:[
            {
                 test: /\.js$/,
                 exclude: /node_modules/, 
                 use: "babel-loader"
            },
            {
                test: /\.css/,
                exclude: /node_modules/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.(png|jpg|jpeg|gif|woff|woff2|eot|ttf|svg)(\?.*)?$/,
                use: "url-loader"
            },            
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ["style-loader","css-loader?modules","sass-loader"]
            }
        ],         
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,"index.html")
        })
    ],    
    devServer: {
        open: true,
        port: 4000,
        hot: true,
        inline: true
    }
}