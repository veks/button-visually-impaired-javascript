'use strict'

import babel from 'rollup-plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import replace from 'rollup-plugin-replace'
import {nodeResolve} from '@rollup/plugin-node-resolve'
import nodePolyfills from 'rollup-plugin-node-polyfills'
import {version, homepage, author, license} from './package.json'

const path = require('path')
const production = !process.env.ROLLUP_WATCH
const name = 'bvi'
const banner = `/*!
  * Button visually impaired - v${version} ${homepage}
  * Copyright 2014-${new Date().getFullYear()} ${author}.
  * Licensed ${license} (https://github.com/veks/button-visually-impaired-javascript/blob/master/LICENSE.md)
  */`

export default {
    input: path.resolve(__dirname, 'src/js/index.umd.js'),
    output: {
        banner,
        name: 'isvek',
        file: path.resolve(__dirname, `dist/js/${name}.js`),
        format: 'umd',
    },
    plugins: [
        nodePolyfills(),
        nodeResolve({
            browser: true,
            preferBuiltins: true,
            jsnext: true,
            main: true,
            brower: true,
        }),
        commonjs({
            include: 'node_modules/**',
        }),
        babel({
            exclude: 'node_modules/**',
            babelrc: false,
            presets: [
                [
                    '@babel/preset-env',
                    {
                        modules: false,
                        targets: {
                            browsers: '> 0.5%, ie >= 9',
                        },
                        useBuiltIns: 'entry',
                        corejs: 3,
                        debug: true,
                    },
                ],
            ],
        }),
        replace({
            'process.env': production ? '"production"' : '"dev"',
        }),
    ],
}
