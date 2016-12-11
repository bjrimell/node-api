var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var JourneySchema   = new Schema({
	origin: String,
    destination: String,
    mode: String,
    price: String,
    currency: String,
    journeyDate: String,
    journeyDuration: String,
    comments: String,
    upVotes: String,
    downVotes: String
});

module.exports = mongoose.model('Journey', JourneySchema);