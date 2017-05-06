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
    db: 'mongodb://weschen:12345678@ds062889.mlab.com:62889/wesblog',
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
    db: 'mongodb://weschen:12345678@ds062889.mlab.com:62889/wesblog',
    post: postConfig
  }
};

module.exports = config[env];
