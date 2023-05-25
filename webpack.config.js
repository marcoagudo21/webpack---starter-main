const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const MiniCssExtractPlugin = require('mini-css-extract-plugin');





module.exports = {

    mode: 'development',
    module: {
        
            rules: [
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
          filename: '[name].css',
          ignoreOrder: false 
        })
      ],
      

}

