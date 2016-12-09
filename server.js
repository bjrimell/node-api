// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 8080; // set our port

var mongoose   = require('mongoose');
mongoose.connect('mongodb://dbuser:vocalist@ds127878.mlab.com:27878/crowdroutes'); // connect to our database
var Bear     = require('./app/models/bear');
var Place     = require('./app/models/place');
var Journey     = require('./app/models/journey');

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

// on routes that end in /bears
// ----------------------------------------------------
router.route('/bears')

	// create a bear (accessed at POST http://localhost:8080/bears)
	.post(function(req, res) {
		
		var bear = new Bear();		// create a new instance of the Bear model
		bear.name = req.body.name;  // set the bears name (comes from the request)
		bear.country = req.body.country;

		bear.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Bear created!' });
		});

		
	})

	// get all the bears (accessed at GET http://localhost:8080/api/bears)
	.get(function(req, res) {
		Bear.find(function(err, bears) {
			if (err)
				res.send(err);

			res.json(bears);
		});
	});

// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/bears/:bear_id')

	// get the bear with that id
	.get(function(req, res) {
		Bear.findById(req.params.bear_id, function(err, bear) {
			if (err)
				res.send(err);
			res.json(bear);
		});
	})

	// update the bear with this id
	.put(function(req, res) {
		Bear.findById(req.params.bear_id, function(err, bear) {

			if (err)
				res.send(err);

			bear.name = req.body.name;
			bear.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Bear updated!' });
			});

		});
	})

	// delete the bear with this id
	.delete(function(req, res) {
		Bear.remove({
			_id: req.params.bear_id
		}, function(err, bear) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});

// on routes that end in /places
// ----------------------------------------------------
router.route('/places')

	// create a bear (accessed at POST http://localhost:8080/places)
	.post(function(req, res) {
		
		var place = new Place();		// create a new instance of the Place model
		place.name = req.body.name;  // set the bears name (comes from the request)
		place.country = req.body.country;

		place.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Place created!' });
		});

		
	})

	// get all the places (accessed at GET http://localhost:8080/api/places)
	.get(function(req, res) {
		Place.find(function(err, places) {
			if (err)
				res.send(err);

			res.jsonp(places);
		});
	});

// on routes that end in /places/:place_id
// ----------------------------------------------------
router.route('/places/:place_id')

	// get the place with that id
	.get(function(req, res) {
		Place.findById(req.params.place_id, function(err, place) {
			if (err)
				res.send(err);
			res.jsonp(place);
		});
	})

	// update the place with this id
	.put(function(req, res) {
		Place.findById(req.params.place_id, function(err, place) {

			if (err)
				res.send(err);

			place.name = req.body.name;
			place.country = req.body.country;
			place.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Place updated!' });
			});

		});
	})

	// delete the place with this id
	.delete(function(req, res) {
		Place.remove({
			_id: req.params.place_id
		}, function(err, place) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});

// on routes that end in /places/:place_name
// ----------------------------------------------------
router.route('/places/specific/:place_name')

	// get the place with that id
	.get(function(req, res) {
		Place.findOne({name: req.params.place_name}, function(err, place) {
			if (err)
				res.send(err);
			res.jsonp(place);
		});
	})

	// update the place with this id
	.put(function(req, res) {
		Place.findOne(req.params.place_name, function(err, place) {

			if (err)
				res.send(err);

			place.name = req.body.name;
			place.country = req.body.country;
			place.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Place updated!' });
			});

		});
	})

	// delete the place with this id
	.delete(function(req, res) {
		Place.remove({
			_id: req.params.place_name
		}, function(err, place) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});

// JOURNEYS ENDPOINYS ____________________________________________________
// on routes that end in /journeys
// ----------------------------------------------------
router.route('/journeys')

	// create a bear (accessed at POST http://localhost:8080/places)
	.post(function(req, res) {
		
		var journey = new Journey();
		journey.origin = req.body.origin;
		journey.destination = req.body.destination;

		journey.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Journey created!' });
		});

		
	})

	// get all the places (accessed at GET http://localhost:8080/api/places)
	.get(function(req, res) {
		Journey.find(function(err, journeys) {
			if (err)
				res.send(err);

			res.jsonp(journeys);
		});
	});

// on routes that end in /journeys/from/:origin
// ----------------------------------------------------
router.route('/journeys/from/:origin')

	// get the place with that id
	.get(function(req, res) {
		Journey.find({'origin': req.params.origin}, function(err, journeys) {
			if (err)
				res.send(err);
			res.jsonp(journeys);
		});
	})

/*
	// update the place with this id
	.put(function(req, res) {
		Place.findById(req.params.place_id, function(err, place) {

			if (err)
				res.send(err);

			place.name = req.body.name;
			place.country = req.body.country;
			place.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Place updated!' });
			});

		});
	})

	// delete the place with this id
	.delete(function(req, res) {
		Place.remove({
			_id: req.params.place_id
		}, function(err, place) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});

// on routes that end in /places/:place_name
// ----------------------------------------------------
router.route('/places/specific/:place_name')

	// get the place with that id
	.get(function(req, res) {
		Place.findOne({name: req.params.place_name}, function(err, place) {
			if (err)
				res.send(err);
			res.jsonp(place);
		});
	})

	// update the place with this id
	.put(function(req, res) {
		Place.findOne(req.params.place_name, function(err, place) {

			if (err)
				res.send(err);

			place.name = req.body.name;
			place.country = req.body.country;
			place.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Place updated!' });
			});

		});
	})

	// delete the place with this id
	.delete(function(req, res) {
		Place.remove({
			_id: req.params.place_name
		}, function(err, place) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});
	*/

	// on routes that end in /journeys/to/:destination
// ----------------------------------------------------
router.route('/journeys/to/:destination')

	// get the place with that id
	.get(function(req, res) {
		Journey.find({'destination': req.params.destination}, function(err, journeys) {
			if (err)
				res.send(err);
			res.jsonp(journeys);
		});
	})

/*
	// update the place with this id
	.put(function(req, res) {
		Place.findById(req.params.place_id, function(err, place) {

			if (err)
				res.send(err);

			place.name = req.body.name;
			place.country = req.body.country;
			place.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Place updated!' });
			});

		});
	})

	// delete the place with this id
	.delete(function(req, res) {
		Place.remove({
			_id: req.params.place_id
		}, function(err, place) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});

// on routes that end in /places/:place_name
// ----------------------------------------------------
router.route('/places/specific/:place_name')

	// get the place with that id
	.get(function(req, res) {
		Place.findOne({name: req.params.place_name}, function(err, place) {
			if (err)
				res.send(err);
			res.jsonp(place);
		});
	})

	// update the place with this id
	.put(function(req, res) {
		Place.findOne(req.params.place_name, function(err, place) {

			if (err)
				res.send(err);

			place.name = req.body.name;
			place.country = req.body.country;
			place.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Place updated!' });
			});

		});
	})

	// delete the place with this id
	.delete(function(req, res) {
		Place.remove({
			_id: req.params.place_name
		}, function(err, place) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});
	*/

	// on routes that end in /journeys/from/:origin/to/:destination
// ----------------------------------------------------
router.route('/journeys/from/:origin/to/:destination')

	// get the place with that id
	.get(function(req, res) {
		Journey.find({'origin': req.params.origin, 'destination': req.params.destination}, function(err, journeys) {
			if (err)
				res.send(err);
			res.jsonp(journeys);
		});
	})

/*
	// update the place with this id
	.put(function(req, res) {
		Place.findById(req.params.place_id, function(err, place) {

			if (err)
				res.send(err);

			place.name = req.body.name;
			place.country = req.body.country;
			place.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Place updated!' });
			});

		});
	})

	// delete the place with this id
	.delete(function(req, res) {
		Place.remove({
			_id: req.params.place_id
		}, function(err, place) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});

// on routes that end in /places/:place_name
// ----------------------------------------------------
router.route('/places/specific/:place_name')

	// get the place with that id
	.get(function(req, res) {
		Place.findOne({name: req.params.place_name}, function(err, place) {
			if (err)
				res.send(err);
			res.jsonp(place);
		});
	})

	// update the place with this id
	.put(function(req, res) {
		Place.findOne(req.params.place_name, function(err, place) {

			if (err)
				res.send(err);

			place.name = req.body.name;
			place.country = req.body.country;
			place.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Place updated!' });
			});

		});
	})

	// delete the place with this id
	.delete(function(req, res) {
		Place.remove({
			_id: req.params.place_name
		}, function(err, place) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});
	*/

// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
