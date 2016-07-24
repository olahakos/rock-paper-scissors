const config = {};

config.env = process.env.NODE_ENV || 'development';
config.isProd = config.env === 'production';
config.isTest = config.env === 'test';
config.isDev = config.env === 'development';

config.port = process.env.PORT || 8080;

module.exports = config;
