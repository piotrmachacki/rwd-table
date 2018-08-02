import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';

const babelConfig = {
  'presets': [
    ['env', {
      'targets': {
        'browsers': ['last 2 versions']
      },
      'loose': true
    }]
  ]
};

const pkg = require('./package.json');

export default {
  output  : {
    format   : 'umd',
    name     : 'rwd-table',
    sourcemap: true,
    exports  : 'none',
    globals  : {
      'jquery': 'jQuery'
    },
    banner: `/*!
 * RWD Table (v${pkg.version})
 * @copyright 2018 Piotr Machacki <piotr@machacki.pl>
 * @licence Apache License, Version 2.0
 */`
  },
  external: [
    'jquery',
  ],
  plugins : [
    replace({
      delimiters: ['', ''],
      'export default rwdTable;': ''
    }),
    resolve(),
    babel(babelrc({
      addExternalHelpersPlugin: false,
      config: babelConfig,
      exclude: 'node_modules/**'
    }))
  ]
};
