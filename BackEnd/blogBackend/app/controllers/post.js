var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Post = mongoose.model('Post');
//this Post from model module name no file name

module.exports = function (app) {
  app.use('/post', router);
};

//---------------------------------------------------------------------------------------------------

//get post list
router.get('/', function (req, res, next) {
  Post.find({}, function (err, posts) {
    if (err) return next(err);
    res.jsonp(posts);
  });
});

//---------------------------------------------------------------------------------------------------

//get post
router.get('/:id', function (req, res, next) {
  Post.find({ _id: req.params.id }, function (err, posts) {
    if (err) return next(err);

    //check record
    if (!posts) {
      res.status(404).send('can not found record.');
    }

    //update query
    var query = { $set: { view: 1, updated: new Date() } };

    //update and response
    Post.update({ _id: req.params.id }, query, function (error, post) {
      if (error) return next(error);
      res.jsonp(posts);
    });

  });
});

//---------------------------------------------------------------------------------------------------

//add post
router.post('/', function (req, res, next) {
  //{"post":{"title":"今天是个好天气","text":"今天天气还不错的样子，可以出去走走","author":"wes"}}
  //if post save json
  //new entity
  var postEntity = new Post({
    title: req.body.post.title,
    author: req.body.post.author,
    text: req.body.post.text,
    view: 0,
    created: new Date(),
    updated: new Date()
  });

  //save record
  // postEntity.save(function (err, newPost) {
  //   if (err) return next(err);
  //   res.status(200).send('save post success.');
  // });

  //save record
  Post.create(postEntity, (err) => {
    if (err) return next(err);
    res.status(200).send('save post success.');
  })
});

//---------------------------------------------------------------------------------------------------

//update post
router.put('/:id', function (req, res, next) {
  Post.find({ _id: req.params.id }, function (err, posts) {
    if (err) return next(err);

    if (!posts) {
      res.status(404).send('can not found record.');
    }

    //update query
    var query = {
      $set: {
        title: req.body.post.title,
        author: req.body.post.author,
        text: req.body.post.text,
        updated: new Date()
      }
    };

    //update and response
    Post.update(posts, query, function (error, post) {
      if (error) return next(error);
      res.status(200).send('update post success.');
    });
  });
});

//---------------------------------------------------------------------------------------------------

//delete post
router.delete('/:id', function (req, res, next) {

  //function 1
  // Post.find({ _id: req.params.id }).remove().exec(function (err, posts) {
  //   if (err) return next(err);
  //   res.status(200).send('delete post success.');
  // });

  //function 2
  Post.findOne({ _id: req.params.id }, function (err, posts) {
    if (err) return next(err);
    if (posts) {
      posts.remove();
      res.status(200).send('delete post success.');
    }
  });
});