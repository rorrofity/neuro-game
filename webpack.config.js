const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const path = require('path');

module.exports = async function(env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  
  // Customize the configuration here
  config.module.rules.push({
    test: /\.css$/,
    use: ['style-loader', 'css-loader'],
    exclude: /node_modules/,
  });

  config.resolve.alias = {
    ...config.resolve.alias,
    'react-native$': 'react-native-web',
  };

  return config;
};
