const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path');

// Middleware to parse JSON data
app.use(express.json({ limit: '50mb' }));

// Middleware to parse JSON bodies
// app.use(bodyParser.json());

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cors())

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Specify the directory where the view templates are stored
// app.set('views', './views');

app.set('views', path.join(__dirname, 'views'));

// Example of a static file middleware (for serving CSS, JS, etc.)
app.use(express.static('public'));

const PORT = process.env.PORT || 8080;

const API_CALL = require('../src/routes/Router');

app.use('/api', API_CALL)

app.listen(PORT, () => {
    console.log(`server Started at ${PORT}`)
})