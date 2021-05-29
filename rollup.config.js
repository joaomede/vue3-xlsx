import { DEFAULT_EXTENSIONS } from '@babel/core'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import external from 'rollup-plugin-peer-deps-external'
import replace from 'rollup-plugin-replace'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'
import vue from 'rollup-plugin-vue'

const plugins = [
  vue({
    compileTemplate: true
  }),
  commonjs(),
  resolve({ mainFields: ['browser', 'jsnext:main', 'module', 'main'] }),
  replace({
    'process.env.NODE_ENV': JSON.stringify('development')
  }),
  typescript({
    tsconfig: 'tsconfig.dist.json',
    tsconfigOverride: {
      compilerOptions: {
        declaration: true
      },
      include: ['./components/**/*.ts'],
      exclude: ['./src', 'node_modules']
    }
  }),
  terser(),
  babel({
    extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
    babelrc: true,
    runtimeHelpers: true
  }),
  external({ includeDependencies: false })
]

const builds = {
  'cjs-dev': {
    outFile: 'dist/vue3-xlsx.cjs.js',
    format: 'cjs',
    mode: 'development'
  },
  'cjs-prod': {
    outFile: 'dist/vue3-xlsx.cjs.prod.js',
    format: 'cjs',
    mode: 'production'
  },
  'umd-dev': {
    outFile: 'dist/vue3-xlsx.umd.js',
    format: 'umd',
    mode: 'development'
  },
  'umd-prod': {
    outFile: 'dist/vue3-xlsx.umd.prod.js',
    format: 'umd',
    mode: 'production'
  },
  esm: {
    outFile: 'dist/vue3-xlsx.esm.js',
    format: 'es',
    mode: 'development'
  }
}

function createEntries () {
  return Object.keys(builds).map((c) => createEntry(builds[c]))
}

function onwarn (msg, warn) {
  if (!/Circular/.test(msg)) {
    warn(msg)
  }
}

function createEntry (config) {
  const c = {
    external: ['vue', 'xlsx'],
    input: 'components/index.ts',
    plugins: [],
    output: {
      file: config.outFile,
      format: config.format,
      globals: {
        vue: 'Vue'
      },
      exports: 'named'
    },
    onwarn
  }

  if (config.format === 'iife' || config.format === 'umd') {
    c.output.name = c.output.name || 'vue3-xlsx'
    c.output.extend = true
  }

  c.plugins = [...plugins]

  return c
}
const buildConfig = [...createEntries()]

export default buildConfig
