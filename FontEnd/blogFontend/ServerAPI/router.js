var express = require('express');
var router = express.Router();
var Pusher = require('pusher');

var pusher = new Pusher({
  appId: '318756',
  key: '235fe40f2b7ff3ad0a37',
  secret: '6bd1e5f9795c76f08fa2',
  cluster: 'ap1',
  encrypted: true
});

router.use(function(req, res, next) {
    next();
});

// router.get('/', function(req, res) {
//     res.json({ message: 'get' });
// });

// router.post('/', function(req, res) {
//     res.json({ message: 'post' });
// });

// router.get('/about', function(req, res) {
//     res.send('About the app');
// });

// router.get('/comment', function(req, res) {
//     res.json({ message: 'comment get' });
// });

// router.post('/comment', function(req, res) {
//     console.log(req.body.name);
//     var newComment = {
//         name: req.body.name,
//         imageUrl: "",
//         comment: req.body.comment
//     }
//     pusher.trigger('flash-comments', 'new-comment', newComment);
//     res.json(newComment);
// });

module.exports = router;