var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'blogbackend'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/blogbackend-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'blogbackend'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/blogbackend-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'blogbackend'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/blogbackend-production'
  }
};

module.exports = config[env];
