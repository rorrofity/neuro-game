const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const path = require('path');

module.exports = async function(env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  
  // Remove any existing CSS rules
  config.module.rules = config.module.rules.filter(rule => rule && rule.test && rule.test.toString() !== '/\\.css$/');

  // Add a new rule for CSS files
  config.module.rules.push({
    test: /\.css$/,
    use: ['style-loader', 'css-loader'],
    sideEffects: true,
  });

  config.resolve.alias = {
    ...config.resolve.alias,
    'react-native$': 'react-native-web',
  };

  return config;
};
