var path = require('path');
var webpack = require('webpack');

var SRC_PATH = path.join(__dirname, 'src');
var FONT_PATH = path.join(__dirname, 'font');

module.exports = {
    entry: {
        app: './src/main.js'
    },
    output: {
        path: '../node/app/static',
        filename: 'bundle.js'
    },
    plugins: [
        //这个使用uglifyJs压缩你的js代码
        new webpack.optimize.UglifyJsPlugin({minimize: true}),
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' }),
    ],
    resolve: {
        extensions: ['', '.js', '.vue']
    },
    module: {
        loaders: [{
            test: /\.vue$/,
            include: path.join(SRC_PATH, 'components'),
            loader: 'vue',
        }, {
            test: /\.js$/,
            // excluding some local linked packages.
            // for normal use cases only node_modules is needed.
            include: SRC_PATH,
            exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
            loader: 'babel'
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader',
            include: path.join(SRC_PATH, 'css')
        },{
            test: /\.(png|jpg)$/,
            loader: 'url-loader?limit=8192'
        },
        {
           test: /\.(ttf|svg|woff|png|eot)/,
           loader : 'url-loader?limit=8192',
           include: path.join(path.join(__dirname, 'iconfont'))
       }]
    },
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    }
};
