const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase(text);
});

app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log  = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  } );
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });


app.use(express.static(__dirname + '/views'));

app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!</h1>');
  // res.send({
  //   name: 'Zuotian',
  //   address: '317 Antoine-Plamondon, Laval'
  // });
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    firstName: 'Simon',
    lastName: 'Zheng'
  });
});

app.listen(3000);

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Us'
  });
});


app.get('/bad', (req, res) => {
  res.send({
    error: 'Page not found',
    code: 404
  });
});
