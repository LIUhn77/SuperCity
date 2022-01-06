/*
 * @Author: YourName
 * @Date: 2021-12-31 17:21:57
 * @LastEditTime: 2022-01-04 15:23:27
 * @Description: 
 * @版权声明
 */
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

//导入
let cesiumSource = './node_modules/cesium/Source'
let cesiumWorkers = '../Build/Cesium/Workers'

module.exports = {
    // 基本路径
    publicPath: "./",
    // 输出文件目录
    outputDir: "dist",
    //关闭slint的语法检测
    lintOnSave: false,
    devServer: {
        overlay: {
            warnings: false,
            errors: false
        },
    },
    devServer: {
        // 配置反向代理
        proxy: {
          //登录接口代理
            '/DataDir': {
              target: 'http://120.76.201.88:88/DataDir/', //这里可以跟随项目实际部署服务器来
              changeOrigin: true,
              ws: true,
              pathRewrite: {
                '^/DataDir': '/' //自定义
              }
            }
        },

    },
    configureWebpack: {
        plugins: [
            new CopyWebpackPlugin([{ from: path.join(cesiumSource, cesiumWorkers), to: 'Workers' }]),
            new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Assets'), to: 'Assets' }]),
            new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' }]),
            new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'ThirdParty/Workers'), to: 'ThirdParty/Workers' }]),
            new webpack.DefinePlugin({
                CESIUM_BASE_URL: JSON.stringify('./')
            })
        ],
        module: {
            rules: [
                {
                    test: /.js$/,
                    use: {
                        loader: '@open-wc/webpack-import-meta-loader',
                    },
                },
            ],
        },
    },

}

