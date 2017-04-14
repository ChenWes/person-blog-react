// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  text: { type: String, required: true },
  view: { type: Number, required: true, default: 0 },
  created: { type: Date },
  updated: { type: Date }
});

PostSchema.virtual('date')
  .get(function () {
    return this._id.getTimestamp();
  });

mongoose.model('Post', PostSchema);

