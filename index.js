const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const port = process.env.PORT || 3000;

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layouts/main');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.render('home', {
    title: 'SafeGuardianAI - AI-Powered Emergency Response',
    active: 'home'
  });
});

app.get('/technology', (req, res) => {
  res.render('technology', {
    title: 'Our Technology - SafeGuardianAI',
    active: 'technology'
  });
});

app.get('/investors', (req, res) => {
  res.render('investors', {
    title: 'Investor Relations - SafeGuardianAI',
    active: 'investors'
  });
});

app.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Contact Us - SafeGuardianAI',
    active: 'contact'
  });
});

app.get('/team', (req, res) => {
  res.render('team', {
    title: 'Our Team - SafeGuardianAI',
    active: 'team'
  });
});

app.listen(port, (err) => {
  if (err) {
    console.error('Error starting server:', err);
    return;
  }
  console.log(`Server running at http://localhost:${port}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use. Try using a different port.`);
  } else {
    console.error('Server error:', err);
  }
}); 