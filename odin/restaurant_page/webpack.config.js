const path = require('path');
const htmlplugin = require('html-webpack-plugin');

module.exports={
    mode:"development",
    entry:"./src/index.js",
    devtool: "inline-source-map",
    devServer:{
        static:'./dist'
    },
    module:{
        rules:[
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ]
    },
    plugins:[
        new htmlplugin({
            filename:"index.html",
            template:'./src/index.html',
            inject:'body',
        })
    ],
    output:{
        filename : "main.js",
        path:path.resolve(__dirname,'dist'),
        clean:true
    }
};