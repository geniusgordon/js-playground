import 'babel-polyfill';
import hook from 'css-modules-require-hook';

hook({
  generateScopedName: '[name]__[local]___[hash:base64:5]',
  camelCase: true,
});

