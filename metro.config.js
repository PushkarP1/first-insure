const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Allow Metro to bundle .lottie files as assets
config.resolver.assetExts.push('lottie');

module.exports = config;
