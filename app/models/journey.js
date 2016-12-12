var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var JourneySchema   = new Schema({
    id: String,
	origin: String,
    destination: String,
    mode: String,
    price: String,
    currency: String,
    journeyDate: String,
    journeyDuration: String,
    comments: String,
    upVotes: Number,
    downVotes: Number
});

module.exports = mongoose.model('Journey', JourneySchema);