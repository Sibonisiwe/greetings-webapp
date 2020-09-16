const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const Greetings = require('./greetings');
const greetings = require('./greetings');

const greeting = Greetings();
const app = express();


app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({
  layoutsDir: './views/layouts'
}));

// initialise session middleware - flash-express depends on it
app.use(session({
  secret: "<add a secret string here>",
  resave: false,
  saveUninitialized: true
}));

// initialise the flash middleware
app.use(flash());


app.get('/addFlash', function (req, res) {
  req.flash('info', 'Flash Message Added');
  res.redirect('/');
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(express.static('public'));


app.get('/', function (req, res) {
  res.render('index', {
  });
});

app.post('/greet', async function (req, res) {
 try {
  var namesEntered = req.body.user;
  var radioChecked = req.body.language;

  if (!namesEntered && !radioChecked) {
    req.flash('info', 'Please enter a name and select a language');
  }
  else if (!namesEntered) {
    req.flash('info', 'Please enter a name');
  }
  else if (!radioChecked) {
    req.flash('info', 'Please select a language');
  }
  let greets = {
    greetName: await greeting.languageChecked(radioChecked, namesEntered),
    counter: await greeting.getCounter()
  }
  res.render('index', {
    greets
  });
 } catch (error) {
console.log(error); }
});

app.get('/greeted', async function (req, res) {
 try {
  console.log(await greeting.getGreetedNames());

  res.render('greeted', {
    names: await greeting.getGreetedNames(),
  });
   
 } catch (error) {
   console.log(error);
 }
});

app.get('/counter/:user', async function (req, res) {
  const userGreeted = req.params.user;
  let personsMessage = greeting.nameGreeted(userGreeted)
  res.render('counter', {
    sentence: await personsMessage
  });
});

app.get('/reset', async function(req, res) {
  await greeting.clear();
 res.render('index', {

 });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log('App starting on port:', PORT);
});