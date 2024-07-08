const path = require('path');
const htmlplugin = require('html-webpack-plugin');

module.exports={
    mode:"development",
    entry:"./src/index.js",
    devtool: "inline-source-map",
    devServer:{
        static:'./dist'
    },
    plugins:[
        new htmlplugin({
            filename:"index.html",
            template:'./src/index.html',
            inject:'body'
        })
    ],
    output:{
        filename : "main.js",
        path:path.resolve(__dirname,'dist')
    }
};