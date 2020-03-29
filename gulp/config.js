import {DefinePlugin, LoaderOptionsPlugin} from 'webpack';
import {babel} from '../package.json';

// CONSTANTS
const CLIENT_DIR = './client';
const JS_DEST_DIR = './assets/js';
const STYLUS_DIR = './assets/css/stylus';
const CSS_DEST_DIR = './assets/css';

//----------------------------------------
// WebPack
//----------------------------------------
export const webpack = {
    mode: 'production',
    entry: {
        index: CLIENT_DIR + '/index'
    },
    output: {
        filename: '[name].bundle.js',
        publicPath: JS_DEST_DIR
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    //externals: {
    //    createjs: 'createjs'
    //},
    cache: true,
    devtool: process.env.NODE_ENV === 'production' ? false : 'source-map',
    plugins: [
        new DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        })
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            babelrc: false,
                            cacheDirectory: true,
                            presets: babel.presets,
                            plugins: babel.plugins
                        }
                    }
                ]
            }
        ]
    }
};

//----------------------------------------
// Stylus
//----------------------------------------
export const stylus = {
    src: [STYLUS_DIR + '/!(_)*styl'],
    dest: CSS_DEST_DIR,
    minify: true
};

//----------------------------------------
// Watch Config
//----------------------------------------
export const watch = {
    client: CLIENT_DIR + '/**',
    stylus: STYLUS_DIR + '/**/*.styl'
};
