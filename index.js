/*
 * @Author: LyraLee
 * @Date: 2019-11-30 10:20:06
 * @LastEditTime: 2020-12-15 14:44:47
 * @Description:
 * 1)该插件在编译src/index.js时生效
 * 2)该插件会启动一次编译，以skeleton.webpack.js作为配置文件，得到一个输出结果
 *   输出结果为svg图片，将其插入<div id="root"></div>
 */
const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

class SkeletonWebpackPlugin {
  constructor(options) {
    this.options = options; // skeletonWebpackConfig
  }

  apply(compiler) { // compiler表示整个编译器
    // compilation表示一次编译
    compiler.hooks.compilation.tap('SkeletonWebpackPlugin', (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).afterTemplateExecution.tapAsync('SkeletonWebpackPlugin', (htmlPluginData, callback) => {
        // 启动一次子编译
        const outputPath = path.join(this.options.pathname, 'index.html');
        fs.readFile(outputPath, 'utf8', (err, data) => {
          if (err) throw err;
          htmlPluginData.html = htmlPluginData.html.replace('<div id="root"></div>', `<div id="root">${data}</div>`);
          callback(null, htmlPluginData);
        });
      });
    });
  }
}

module.exports = SkeletonWebpackPlugin;
