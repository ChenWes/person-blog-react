// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var UserSchema = new Schema({
  usercode: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  created: { type: Date },
  updated: { type: Date }
});

UserSchema.virtual('date')
  .get(function () {
    return this._id.getTimestamp();
  });

mongoose.model('User', UserSchema);

