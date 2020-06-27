const path = require('path'); //path内置的模块，用来设置路径。


module.exports = {
    //入口（从哪里进入开始解析）
    entry:'./src/js/index.js',
    //输出（最终加工完的代码输出到哪里）
    output: {// 输出配置
        path: path.resolve(__dirname, 'build'),//输出文件路径配置
        filename: 'index.js',// 输出文件名
    },
    //所有的loader都要配置在module里,所有的loader在使用的时候，都不用引入。
    module: {
        //rules中指明loader“干活”的顺序，以及处理哪些文件。
        rules: [//向rules中写入配置：
            //使用loader解析less文件 （使用less-loader css-loader style-loader）
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // 创建一个style标签，将js中的css放入其中
                }, {
                    loader: "css-loader" // 将css以CommonJs语法打包到js中
                }, {
                    loader: "less-loader" // 将less转换成css
                }]
            },
            //file-loader处理图片资源
            /*{
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader', //如果不做图片转base64，可以用file-loader
                        options: {
                            outputPath:'img', //图片最终输出的位置,以输出文件夹为基准(build)
                            publicPath:'../build/img',//css资源图片路径,以src文件夹为基准
                            name:'[hash:5].[ext]'//修改图片名称
                        }
                    }
                ]
            },*/
            //url-loader处理图片资源&base64（可以转换base64编码）
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',       //如果不做图片转base64，可以用file-loader
                        options: {
                            limit: 8192,//图片大小的敏感点，大于8KB不转换，小于8KB转成base64
                            outputPath:'img',  //图片最终输出的位置
                            publicPath:'../build/img',	//css资源图片路径
                            name:'[hash:5].[ext]'     //修改图片名称
                        }
                    }
                ]
            }

            ]
    }

}