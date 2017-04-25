var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  config = require('../../config/config');
//this Post from model module name no file name

module.exports = function (app) {
  app.use('/user', router);
};

//---------------------------------------------------------------------------------------------------

//get user list
// router.get('/', function (req, res, next) {
//   var pagesize = config.post.defaultPageSize;
//   var pageindex = 1;

//   var mongo_query = Post.find({});
//   mongo_query.limit(pagesize);
//   mongo_query.skip((pageindex - 1) * pagesize);

//   mongo_query.exec(function (err, posts) {
//     if (err) return next(err);
//     res.jsonp(posts);
//   });
// });

// router.post('/pagelist', function (req, res, next) {

//   var count = 0;
//   var pageindex = req.body.pageindex;
//   var pagesize = req.body.pagesize;

//   var mongo_query = Post.find({});
//   mongo_query.limit(pagesize);
//   mongo_query.skip((pageindex - 1) * pagesize);

//   mongo_query.exec(function (err, posts) {
//     if (err) return next(err);
//     res.jsonp(posts);
//   });
// });


//---------------------------------------------------------------------------------------------------

//get user
router.get('/:id', function (req, res, next) {
  User.find({ _id: req.params.id }, function (err, users) {
    if (err) return next(err);

    //check record
    if (!users) {
      res.status(404).send('can not found record.');
    }
    else {
      res.json(users);
    }
  });
});

//---------------------------------------------------------------------------------------------------

//user login
router.post('/login', function (req, res, next) {
  User.findOne({ usercode: req.params.usercode, password: req.params.password }, function (err, users) {
    if (err) return next(err);

    if (!users) {
      res.status(404).send('can not found record.');
    } else {
      res.json(users);
    }
  });
});

//---------------------------------------------------------------------------------------------------

//change password
router.put('/changepassword', function (req, res, next) {
  User.find({ _id: req.body.id }, function (err, users) {
    if (err) return next(err);

    if (!users) {
      res.status(404).send('can not found record.');
    }

    //update query
    var query = {
      $set: {
        password: req.body.password,
        updated: new Date()
      }
    };

    //update and response
    User.update(posts, query, function (error, post) {
      if (error) return next(error);
      res.status(200).send('update post success.');
    });
  });
});
//---------------------------------------------------------------------------------------------------
//add user
router.post('/', function (req, res, next) {
  //{"post":{"title":"今天是个好天气","text":"今天天气还不错的样子，可以出去走走","author":"wes"}}
  //if post save json
  //new entity
  var userEntity = new User({
    usercode: req.body.usercode,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    created: new Date(),
    updated: new Date()
  });

  //save record
  // userEntity.save(function (err, userEntity) {
  //   if (err) return next(err);
  //   res.status(200).send('save user success.');
  // });

  //save record
  User.create(userEntity, (err) => {
    if (err) return next(err);
    res.status(200).send('save user success.');
  })
});
//---------------------------------------------------------------------------------------------------

//delete post
router.delete('/:id', function (req, res, next) {

  //function 1
  // User.find({ _id: req.params.id }).remove().exec(function (err, users) {
  //   if (err) return next(err);
  //   res.status(200).send('delete user success.');
  // });

  //function 2
  User.findOne({ _id: req.params.id }, function (err, users) {
    if (err) return next(err);
    if (users) {
      users.remove();
      res.status(200).send('delete user success.');
    }
  });
});