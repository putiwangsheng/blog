var webpack = require('webpack');

var path = require('path');
var SRC_PATH = path.join(__dirname, 'src');

module.exports = {
    entry: './src/main.js',
    output: {
        path: '../node/app/static',
        publicPath: '/static/',
        filename: 'bundle.js'
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

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin()
    ];
} else {
    module.exports.devtool = '#source-map';
}
