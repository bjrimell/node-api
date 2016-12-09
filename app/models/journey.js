var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var JourneySchema   = new Schema({
	origin: String,
    destination: String
});

module.exports = mongoose.model('Journey', JourneySchema);