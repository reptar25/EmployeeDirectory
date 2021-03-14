var path = require('path');

module.exports = {
    entry: './src/main/js/app.js',
    devtool: 'sourcemaps',
    cache: true,
    mode: 'development',
    output: {
        path: __dirname,
        filename: './demo/src/main/resources/static/built/bundle.js'
    },
    loaders: [
        {
            test: /\.(woff|woff2|eot|ttf|svg)$/,
            loader: 'file?name=fonts/[name].[ext]'
        }
    ],
    module: {
        rules: [
            {
                test: path.join(__dirname, '.'),
                exclude: /(node_modules)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }]
            },
            { test: /\.css$/, use: 'css-loader/locals'},
        ]
    }
};