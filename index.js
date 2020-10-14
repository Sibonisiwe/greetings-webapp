const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const Greetings = require('./greetings');
// const greetings = Greetings();
const Greet = require('./greet');
const pg = require("pg");
const Pool = pg.Pool;
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:codex123@localhost:5432/greetings';
const pool = new Pool({
  connectionString
});

const greeting = Greetings(pool);
const greets = Greet(greeting)
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


app.get('/', greets.homeRoute)

app.post('/greet', greets.greetPerson)

  app.get('/greeted', greets.greeted)

  app.get('/counter/:user', greets.counter)


  app.get('/reset', greets.reset)


  app.get('/back', greets.backBtn)

  app.get('/bckHome', async function (req, res) {
 

    res.render('index', { 

    });
  });



  const PORT = process.env.PORT || 3001;

  app.listen(PORT, function () {
    console.log('App starting on port:', PORT);
  });