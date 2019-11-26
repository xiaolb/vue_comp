var path = require('path');
var webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const NODE_ENV = process.env.NODE_ENV;
function resolve(dir) {
    return path.join(__dirname, dir);
}

const devBase = {
    'custom-ui': './src/main.js',
};
const exportUnique = {
    'custom-ui': './src/index.js',
    // TopsForm: './src/components/form/index.js',
    // TopsQRCode: './src/components/qrcode/index.js',
    // TopsListPage: './src/components/listPage/index.js',
    // TopsModalForm: './src/components/modalForm/index.js',
    // TopsSearch: './src/components/search/index.js',
    // TopsTable: './src/components/table/index.js',
    // TopsUpload: './src/components/upload/index.js',
    // TopsUE: './src/components/ue/index.js',
    // TopsMap: './src/components/map/index.js',
    // TopsWrapper: './src/components/wrapper.vue',
};

console.log(NODE_ENV);

module.exports = {
    entry: NODE_ENV == 'development' ? devBase : exportUnique,
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: '[name].js',
        chunkFilename: '[name].js',
        library: 'custom-ui.js', // 指定的就是你使用require时的模块名
        libraryTarget: 'umd', // libraryTarget会生成不同umd的代码,可以只是commonjs标准的，也可以是指amd标准的，也可以只是通过script标签引入的
        umdNamedDefine: true, // 会对 UMD 的构建过程中的 AMD 模块进行命名。否则就使用匿名的 define
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [NODE_ENV == 'development' ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                        // the "scss" and "sass" values for the lang attribute to the right configs here.
                        // other preprocessors should work out of the box, no loader config like this necessary.
                        scss: ['vue-style-loader', 'css-loader', 'sass-loader'],
                        sass: ['vue-style-loader', 'css-loader', 'sass-loader?indentedSyntax'],
                    },
                    // other vue-loader options go here
                },
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader',
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                // loader: 'babel',
                exclude: /node_modules/,
                query: {
                    // presets: ['es2015',],
                },
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]',
                },
            },
        ],
    },
    resolve: {
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            '@': resolve('./src'),
            '@static': resolve('./static'),
        },
        extensions: ['*', '.js', '.vue', '.json'],
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        overlay: true,
        open: true,
    },
    performance: {
        hints: false,
    },
    devtool: 'source-map',
    optimization: {
        minimizer: [
            new UglifyjsWebpackPlugin({
                // exclude: /\/node_modules/,
                // include: /\/src/,
                uglifyOptions: {
                    //删除注释
                    output: {
                        comments: false,
                    },
                    //删除console 和 debugger  删除警告
                    warnings: false,
                    compress: {
                        drop_debugger: true,
                        drop_console: true,
                    },
                },
            }),
            new OptimizeCssAssetsPlugin({}),
        ],
        splitChunks: {
            automaticNameDelimiter: '~',
            // name: true,
            cacheGroups: {
                // common: {
                //     chunks: 'initial',
                //     name: 'common',
                //     minChunks: 2,
                //     priority: -20,
                // },
                async: {
                    chunks: 'async',
                    name: 'async-common',
                    minChunks: 2,
                    priority: -20,
                },
            },
        },
    },
};

if (process.env.NODE_ENV === 'production') {
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['dist/*'],
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"',
            },
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].css',
        }),
        // copy custom static assets
    ]);
} else {
    module.exports.devtool = '#source-map';
}
