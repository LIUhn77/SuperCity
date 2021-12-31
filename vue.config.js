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

