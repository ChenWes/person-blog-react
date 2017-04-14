var path = require('path'),
  rootPath = path.normalize(__dirname + '/..'),
  env = process.env.NODE_ENV || 'development',
  defaultPort = 4000;

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'PersonBlog'
    },
    port: process.env.PORT || defaultPort,
    db: 'mongodb://localhost/personblog-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'PersonBlog'
    },
    port: process.env.PORT || defaultPort,
    db: 'mongodb://localhost/personblog-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'PersonBlog'
    },
    port: process.env.PORT || defaultPort,
    db: 'mongodb://localhost/personblog-production'
  }
};

module.exports = config[env];
