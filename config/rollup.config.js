import babel from 'rollup-plugin-babel';
import { terser } from "rollup-plugin-terser";
import postcss from 'rollup-plugin-postcss';
import clear from 'rollup-plugin-clear'
import autoprefixer from 'autoprefixer';

const globals = {
  classnames: 'classNames',
  'prop-types': 'PropTypes',
  'react-dom': 'ReactDOM',
  'react-input-autosize': 'AutosizeInput',
  react: 'React',
};
// $FlowFixMe This should be inferred by Flow and manual casting does not work inside of this config.
const external = Object.keys(globals);

const babelOptions = () => {
  let result = {
    babelrc: false,
    presets: [
      '@babel/preset-env',
      '@babel/preset-react',
      '@babel/preset-flow'
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties'
    ]    
  };
  return result;
};
const plugins = [
  clear({
    targets: ['dist'],
  }),
  babel(babelOptions()),
  postcss({
    plugins: [autoprefixer],
    extract: false,
    modules: true,
    extensions: ['.css','.scss']
  }),
  terser()
];
export default[{
    input: 'src/select/index.js',
    output: {
      file: 'dist/es/select.es.js',
      format: 'es'
    },
    external: [...external, 'raf'],
    plugins
  },{
    input: 'src/select/index.js',
    output: {
      file: 'dist/cjs/select.cjs.js',
      format: 'cjs'
    },
    external: [...external, 'raf'],
    plugins
  },{
    input: 'src/select/index.js',
    output: {
      file: 'dist/iife/select.iife.js',
      format: 'iife',
      name: 'select'
    },
    external: [...external, 'raf'],
    plugins
}];