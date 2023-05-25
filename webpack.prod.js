const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");




module.exports = {

    mode: 'production',
    output: {
        filename: `main.[contenthash].js`
    },
    optimization: {
      minimizer: [
        
        new CssMinimizerPlugin(),
      ],
    },
    module: {
        
            rules: [
              {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
              },
              {
                test:/\.css$/i,
                exclude:/styles\.css$/i,
                use: [
                  'style-loader',
                  'css-loader'
                ]
              },
              {
                test:/styles\.css$/i,
                use: [
                  MiniCssExtractPlugin.loader,
                  'css-loader'
                ]
              },
              {
                test: /\.html$/,
                loader: "html-loader",
                
              },
            ],
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: './src/index.html',
          filename: './index.html',
          scriptLoading: 'blocking'
        }),
        new MiniCssExtractPlugin({
          filename: '[contenthash].css',
          ignoreOrder: false ,

        })
      ],
      

}

