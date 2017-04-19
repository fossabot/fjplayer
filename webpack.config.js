var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var path = require('path');
var env = require('yargs').argv.mode;


var libraryName = 'fjplayer';

var plugins = [],
    outputFile;

// for ejs
plugins.push(new webpack.ProvidePlugin({
    _: 'underscore'
}));

if (env === 'build') {
    plugins.push(new UglifyJsPlugin({ minimize: true }));
    outputFile = libraryName + '.min.js';
} else {
    outputFile = libraryName + '.js';
}

var config = {
    entry: __dirname + '/src/',
    devtool: 'source-map',
    output: {
        path: __dirname + '/lib',
        filename: outputFile,
        library: libraryName,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        loaders: [
            { test: /(\.jsx|\.js)$/, loader: 'babel', exclude: /(node_modules|bower_components)/ },
            { test: /(\.jsx|\.js)$/, loader: "eslint-loader", exclude: /node_modules/ },
            { test: /\.scss$/, loaders: ['style', 'css', 'less'] },
            { test: /\.png$/, loader: "file-loader?name=img/[name].png" },
            /* images disponible dans le bundle à l'url /img/[nom-image].png */
            { test: /\.css$/, loader: "style!css?sourceMap" },
            { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },
            { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' }
        ]
    },
    resolve: {
        root: path.resolve('./src'),
        extensions: ['', '.js']
    },
    plugins: plugins
};

module.exports = config;