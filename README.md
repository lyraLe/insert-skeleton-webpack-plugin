#### 使用前提
在插件的主目录下进行必须存在一个存放骨架屏代码（html文件）的文件夹。文件夹名称和👇的pathname保持一致
**骨架屏代码形式**
```
<style>......</style>
<div>.....</div>
```

---

#### 使用方法
可同时用在development和production模式下
```
 const  InsertHtmlWebpackPlugin = require('insert-html-webpack-plugin');
 plugins: [
   new InsertHtmlWebpackPlugin({
     pathname: path.resolve(__dirname, '../shell')
   })
 ]
```
---

#### 项目为create-react-app生成时
1. npm run eject
2. 在config/webpack.config.js中添加如下代码
```
const InsertSkeletonWebpackPlugin = require('insert-skeleton-webpack-plugin');
const isShellExist =fs.existsSync(path.resolve(__dirname, '../shell'));

plugins: [
  ...,
  (isEnvProduction || (!isEnvProduction && isShellExist)) && new InsertSkeletonWebpackPlugin({
    pathname: path.resolve(__dirname, '../shell')
  })
]
```


### 说明
- 该插件配合overwrite-skeleton-webpack-plugin使用
- 或者配合其他插件生成骨架屏代码使用