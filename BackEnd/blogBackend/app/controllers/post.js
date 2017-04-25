var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Post = mongoose.model('Post'),
  config = require('../../config/config');
//this Post from model module name no file name

module.exports = function (app) {
  app.use('/post', router);
};

//---------------------------------------------------------------------------------------------------

//get post list
router.get('/', function (req, res, next) {
  var pagesize = config.post.defaultPageSize;
  var pageindex = 1;

  var mongo_query = Post.find({});
  mongo_query.limit(pagesize);
  mongo_query.skip((pageindex - 1) * pagesize);

  mongo_query.exec(function (err, posts) {
    if (err) return next(err);
    res.json(posts);
  });
});

router.post('/pagelist', function (req, res, next) {

  var count = 0;
  var pageindex = req.body.pageindex;
  var pagesize = req.body.pagesize;

  var mongo_query = Post.find({});
  mongo_query.limit(pagesize);
  mongo_query.skip((pageindex - 1) * pagesize);

  mongo_query.exec(function (err, posts) {
    if (err) return next(err);
    res.status(200).json(posts);
  });
});


//---------------------------------------------------------------------------------------------------

//get post
router.get('/:id', function (req, res, next) {
  Post.find({ _id: req.params.id }, function (err, posts) {
    if (err) return next(err);

    //check record
    if (!posts) {
      res.status(404).json({ message: 'no found' });
    }

    //update query
    var query = { $set: { view: 1, updated: new Date() } };

    //update and response
    Post.update({ _id: req.params.id }, query, function (error, post) {
      if (error) return next(error);
      res.status(200).json(posts);
    });

  });
});

//---------------------------------------------------------------------------------------------------

//add post
router.post('/', function (req, res, next) {
  //{"post":{"title":"newtitle","text":"newtext","author":"wes"}}
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
  postEntity.save(function (err, newPost) {
    if (err) return next(err);
    res.status(200).json(newPost);
  });

});

//---------------------------------------------------------------------------------------------------

//update post
router.put('/:id', function (req, res, next) {
  Post.find({ _id: req.params.id }, function (err, posts) {
    if (err) return next(err);

    if (!posts) {
      res.status(404).json({ message: 'no found' });
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

      //after update , will get data again
      Post.find({ _id: req.params.id }, function (err, posts) {
        if (err) return next(err);

        if (!posts) {
          res.status(404).json({ message: 'no found' });
        }
        res.status(200).json(posts);
      });

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

    if (!posts) {
      res.status(404).json({ message: 'no found' });
    } else {

      posts.remove();
      res.status(200).json({ message: 'success' });
    }
  });
});