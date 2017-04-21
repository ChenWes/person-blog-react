var path = require('path'),
  rootPath = path.normalize(__dirname + '/..'),
  env = process.env.NODE_ENV || 'development',
  defaultPort = 4000,
  postConfig = {
    defaultPageSize: 10
  };

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'PersonBlog'
    },
    port: process.env.PORT || defaultPort,
    db: 'mongodb://192.168.99.100:27018/personblog-development',
    post: postConfig
  },

  test: {
    root: rootPath,
    app: {
      name: 'PersonBlog'
    },
    port: process.env.PORT || defaultPort,
    db: 'mongodb://localhost/personblog-test',
    post: postConfig
  },

  production: {
    root: rootPath,
    app: {
      name: 'PersonBlog'
    },
    port: process.env.PORT || defaultPort,
    db: 'mongodb://localhost/personblog-production',
    post: postConfig
  }
};

module.exports = config[env];
