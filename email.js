var nodemailer = require('nodemailer');
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

var smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'kcaoweb@gmail.com',
        pass: 'kimmyProfile'
    }
};

var transporter = nodemailer.createTransport(smtpConfig);

router.route('/contact')

    // create a bear (accessed at POST http://localhost:8080/api/contact)
    .post(function(req, res) {
     
        // setup e-mail data with unicode symbols
		var mailOptions = {
		    from: '"KimmyBot" <kcaoweb@gmail.com>', // sender address
		    to: 'DanD.Tran@yahoo.com', // list of receivers
		    subject: req.body.subject, // Subject line
		    text: req.body.context, // plaintext body
		    html: req.body.context // html body
		};

		 // send mail with defined transport object
		transporter.sendMail(mailOptions, function(error, info){
		    if(error){
		        return console.log(error);
		    }
		    console.log('Message sent: ' + info.response);
		});
        
    });


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);