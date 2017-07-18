const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // entry: './src/script/main.js', // webpack打包入口:1.字符串形式
  // entry: ['./src/script/main.js','./src/script/a.js'], // 2.数组形式
  entry: {  // 3.多页面入口对象形式
    main: './src/script/main.js',
    a: './src/script/a.js',
    b: './src/script/b.js',
    c: './src/script/c.js',
  },
  output: {  // 打包文件放的位置
    publicPath: 'http://cdn.xx.com/',
    path: path.resolve(__dirname, "./dist"),
    // filename: 'js/bundle.js' // 单入口输出
    // 多入口输出：选项有[id],[name],[hash],[chunkhash]等，[hash] 和 [chunkhash] 的长度可以使用 [hash:16]（默认为20）来指定。或者，通过指定output.hashDigestLength 在全局配置长度
    filename: 'js/[id]-[name]-[chunkhash].js' 
  },
  plugins: [  // 生成多页面配置
    new HtmlWebpackPlugin({
      // template: 'index.html',
      template: path.resolve(__dirname, 'index.html'), // 引用模板文件
      // filename: 'index-[hash].html', // 生成重命名模板文件
      filename: 'a.html', // 生成重命名模板文件
      inject: false, // script标签放在head,body中或不插入:inject: 'head','body',false
      title: 'this is a.html', // 标题，index.html页面用ejs语法可获得数据
      txt: 'this is a.html',
      date: new Date(),
      // chunks: ['main', 'a'], // 只引入对自己有用的组块(只引入main.js和a.js),数组格式
      excludeChunks: ['b', 'c'], // 引入排除某些组块后的其他组块(排除b.js和c.js,引入其他js文件)
      /*minify: {  // 压缩html
        removeComments: true, // 删除注释
        collapseWhitespace: true, // 删除空格
      }*/
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
      filename: 'b.html', // 生成b.html文件
      inject: false,
      title: 'this is b.html',
      txt: 'this is b.html',
      // chunks: ['b'],
      excludeChunks: ['a', 'c'],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
      filename: 'c.html', // 生成c.html文件
      inject: false,
      title: 'this is c.html',
      txt: 'this is c.html',
      // chunks: ['c'],
      excludeChunks: ['a', 'b'],
    })
  ]
}