const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/client/index.js',
    mode: 'development',
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              
            }
          },
          {
              test:/\.s?css$/,
              use: [MiniCssExtractPlugin.loader, "css-loader","sass-loader" ],
          },
          {
            test: /\.(png|jpg|gif|jpeg)$/,
           type: "asset/resource"
      },
        ],
      },
      plugins:[new MiniCssExtractPlugin(),
         new HtmlWebpackPlugin({
        title:"Evaluate News",
        template:"src/client/views/index.html",
      })],
      output:{
        path : path.resolve(__dirname,"dist"),
        
        clean :true,
        assetModuleFilename :'assets/[hash][ext][query]'
      },
        
            
      
      
      

}