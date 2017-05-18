var webpack = require('webpack');
var WebpackShellPlugin = require('webpack-shell-plugin');

var config = {
    entry: './tests/all.js',
    output: {
        filename: './tests/testBundle.js'
    },
    externals: {
        chai: 'chai'
    },
    plugins: [
        new WebpackShellPlugin({
            onBuildExit: "nyc --reporter=lcov mocha tests/mocha_test.js"
        })
    ]
};

module.exports = config;
