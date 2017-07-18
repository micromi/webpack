const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // entry: './src/script/main.js', // webpack打包入口:1.字符串形式
  // entry: ['./src/script/main.js','./src/script/a.js'], // 2.数组形式
  entry: {  // 3.多页面入口对象形式
    main: './src/script/main.js',
    a: './src/script/a.js',
  },
  output: {  // 打包文件放的位置
    publicPath: '',
    path: path.resolve(__dirname, "./dist"),
    // filename: 'js/bundle.js' // 单入口输出
    // 多入口输出：选项有[id],[name],[hash],[chunkhash]等，[hash] 和 [chunkhash] 的长度可以使用 [hash:16]（默认为20）来指定。或者，通过指定output.hashDigestLength 在全局配置长度
    filename: 'js/[id]-[name]-[chunkhash].js' 
  },
  plugins: [
    new HtmlWebpackPlugin({
      // template: 'index.html',
      template: path.resolve(__dirname, 'index.html'), // 引用模板文件
      // filename: 'index-[hash].html', // 生成重命名模板文件
      inject: false, // script标签放在head中:inject: 'head'
      title: 'webpack is good!', // 标题，index.html页面用ejs语法可获得数据
      date: new Date(),
      /*minify: {  // 压缩html
        removeComments: true, // 删除注释
        collapseWhitespace: true, // 删除空格
      }*/
    })
  ]
}