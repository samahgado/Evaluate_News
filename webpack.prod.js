const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require("workbox-webpack-plugin");
module.exports = {
    entry: './src/client/index.js',
    mode: 'production',
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
      }),
      new WorkboxPlugin.GenerateSW({
        // Do not precache images
        exclude: [/\.(?:png|jpg|jpeg|svg)$/],
        // Define runtime caching rules.
        runtimeCaching: [
          {
            // Match any request that ends with .png, .jpg, .jpeg or .svg.
            urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
            // Apply a cache-first strategy.
            handler: "CacheFirst",
            options: {
              // Use a custom cache name.
              cacheName: "images",
              // Only cache 10 images.
              expiration: {
                maxEntries: 10,
              },
            },
          },
        ],
      }),
    ],
      output:{
        path : path.resolve(__dirname,"dist"),
        
        clean :true,
        assetModuleFilename :'assets/[hash][ext][query]'
      },
        
            
      
      
      

}