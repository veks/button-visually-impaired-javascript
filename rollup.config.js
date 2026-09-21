'use strict'

import babel from '@rollup/plugin-babel'
import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { createRequire } from 'module'
import { fileURLToPath } from 'url'

const require = createRequire(import.meta.url)
const path = require('path')
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const { version, homepage, author, license } = require('./package.json')
const name = 'bvi'
const banner = `/*!
  * Button visually impaired - v${version} ${homepage}
  * Copyright 2014-${new Date().getFullYear()} ${author}.
  * Licensed ${license} (https://github.com/veks/button-visually-impaired-javascript/blob/master/LICENSE.md)
  */`

const plugins = [
  nodeResolve(),
  json(),
  babel({
    exclude     : 'node_modules/**',
    babelrc     : false,
    babelHelpers: 'bundled',
    presets     : [
      [
        '@babel/preset-env',
        {
          modules: false,
          targets: {
            browsers: 'defaults and supports es6-module, not dead',
          },
        },
      ],
    ],
  }),
]

export default [
  {
    input : path.resolve(__dirname, 'src/js/index.umd.js'),
    output: {
      banner,
      name  : 'isvek',
      file  : path.resolve(__dirname, `dist/js/${name}.js`),
      format: 'umd',
    },
    plugins,
  },
  {
    input : path.resolve(__dirname, 'src/js/index.esm.js'),
    output: [
      {
        banner,
        file  : path.resolve(__dirname, `dist/js/${name}.esm.js`),
        format: 'esm',
      },
      {
        banner,
        file   : path.resolve(__dirname, `dist/js/${name}.cjs`),
        format : 'cjs',
        exports: 'named',
      },
    ],
    plugins,
  },
]
