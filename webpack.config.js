const path = require('path');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    name: 'word-relay-setting',
    mode: 'development', // 실서비스 : production
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.jsx']
    },
    entry: {
        app: ['./client'],
    }, // 입력

    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            options: {
                presets: [
                        ['@babel/preset-env', {
                    targets: {
                        browsers: ['> 1% in KR'],
                    },
                    debug: true,
                        }],
                    '@babel/preset-react',
                ],
                plugins: [
                    '@babel/plugin-proposal-class-properties',
                    'react-hot-loader/babel',
                ],
            },
        }],
    },
    plugins: [
        new RefreshWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./index.html",
            filename: "./index.html",
            meta: {
                // meta 태그를 추가
                viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
            },
            hash: true,       // 모든 스크립트, css 파일에 고유한 컴파일 해시 추가하여 캐시를 무효화
            showErrors: true, // 오류 정보가 html에 기록됨
        })
    ],
    output: {
        path: path.join(__dirname,'./lecture/dist'), //
        filename: 'app.js',
    }, // 출력
    devServer: {
        hot: true
    },
};