var express = require('express');
var path = require('path');

var bodyParser = require('body-parser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const CONTACT_ADDRESS = 'founders@devxlabs.co';

var mailer = require('nodemailer').createTransport({
	  service: 'Gmail',
	  auth: {
		      user: 'feedback@bmsit.in',
		      pass: 'Feedback@01',
		    }
});

app.post('/contact', function(req, res) {
	mailer.sendMail({
		    from: req.body.firstName,
		    to: [CONTACT_ADDRESS],
		    lastname: req.body.lastName || '[No last name]',
		    email: req.body.email || '[No message]',
		    phone: req.body.phone || 'NO PHONE',
		    question: req.body.question || 'NO BODY',
		  }, function(err, info) {
			      if (err) return res.status(500).send(err);
			      res.json({success: true});
			    })
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
