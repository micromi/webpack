const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.join(__dirname),
  // entry: './src/app.js'
  entry: {
    app: './src/app.js',
  },
  output: {  // 打包文件放的位置
    // publicPath: 'http://cdn.xx.com/',
    path: path.resolve(__dirname, "./dist"),
    // filename: 'js/bundle.js' // 单入口输出
    // 多入口输出：选项有[id],[name],[hash],[chunkhash]等，[hash] 和 [chunkhash] 的长度可以使用 [hash:16]（默认为20）来指定。或者，通过指定output.hashDigestLength 在全局配置长度
    filename: 'js/[name]-bundle.js' 
  },
  devServer: {
    contentBase: "./",
    port: "8088",
    compress: true, // 一切服务都启用gzip压缩
    hot: true, // 热加载,需要 HotModuleReplacementPlugin 插件
    inline: true, // 实时刷新
    open: true,
    stats: { colors: true },
    historyApiFallback: true, // 是否可以回退
  },
  module: {
    loaders: [
      /*{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ["env"]
        }
      },*/
      {
        test: /\.js$/,
        // exclude: /node_modules/,  //排除或不查找的文件夹或文件
        // include: /src/,
        exclude: path.resolve(__dirname, 'node_modules'),  //排除或不查找的文件夹或文件
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader', // 需要安装 babel-loader babel-core babel-preset-env(或babel-preset-latest) 依赖
          options: {
            // { "presets": ["latest"] } === { "presets": ["env"] } 
            presets:["env"]
          }
        }
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader', // 处理html模板文件,需要安装 html-loader 依赖
          options: {
            // minimize: true // 压缩html选项
          }
        }],
      },
      {
        test: /\.ejs$/,
        loader: 'ejs-loader', // 处理ejs模板文件,需要安装 ejs-loader 依赖
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          // 'css-loader',
          {
            loader: 'css-loader',
            options: {
              // importLoaders: 1, // 配置出错
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('postcss-import')(), // 一定要写在require("autoprefixer")前面，否则require("autoprefixer")无效
                require('autoprefixer')({browsers:['last 5 versions']}),
              ]
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          // 'postcss-loader', // 直接配置出错
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('postcss-import')(), // 引入postcss-import配置正确
                require('autoprefixer')({browsers:['last 5 versions']}),
              ]
            }
          },
          'less-loader' // 需要安装 less-loader less 依赖
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          // 'postcss-loader', // 直接配置出错
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('postcss-import')(), // 引入postcss-import配置正确
                require('autoprefixer')({browsers:['last 5 versions']}),
              ]
            }
          },
          'sass-loader' // 需要安装 sass-loader node-sass 依赖
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg|bmp)$/i,
        /*loader: 'file-loader', // file-loader 可以缓存图片资源，但增加http请求
        query: {
          name: 'assets/[name]-[hash:5].[ext]' // 图片输出路径
        }*/
        use: [
          {  // 当图片小于于limit时使用url-loader处理转为base64，大于使用file-loader处理
            loader: 'url-loader', // url-loader' 减少http请求，但导致代码冗余，增加代码体积
            options: {
              name: 'assets/[name]-[hash:5].[ext]', // file-loader配置项
              limit: 100*1000 // url-loader配置项:文件大小小于100kb转为base64
            }  
          },
          /*{ // webpack3中此压缩图片loader报错，不可用
            loader: 'image-webpack-loader', // 压缩图片
            query: {
              progressive: true,
              optimizationLevel: 7,
              interlaced: false,
              pngquant: {
                quality: '65-90', 
                speed: 4
              }
            }
          }*/
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }, 
  plugins: [
    new webpack.HotModuleReplacementPlugin(), //全局开启自动编译和热替换，不用刷新页面
    new HtmlWebpackPlugin({
      // template: 'index.html',
      template: path.resolve(__dirname, 'index.html'), // 引用模板文件
      // filename: 'index-[hash].html', // 生成重命名模板文件
      filename: 'index.html', // 生成重命名模板文件
      inject: 'body', // script标签放在head,body中或不插入:inject: 'head','body',false
      title: 'webpack is good!', // 标题，index.html页面用ejs语法可获得数据
      // chunks: ['main', 'a'], // 只引入对自己有用的组块(只引入main.js和a.js),数组格式
      // excludeChunks: ['b', 'c'], // 引入排除某些组块后的其他组块(排除b.js和c.js,引入其他js文件)
      /*minify: {  // 压缩html
        removeComments: true, // 删除注释
        collapseWhitespace: true, // 删除空格
      }*/
    })
  ]
}