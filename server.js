require('dotenv').config();
const express = require('express');
const app = express();
const Mongo = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

const PORT = 6587;

const TestRoutes = require('./routes/TestRoutes');



app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

// Routes
app.use('/test/', TestRoutes);


app.get('/', (req, res) => {
    res.send('hello server');
});


// Launch server
app.listen(PORT, () => {
    console.log(`Server was started on ${PORT} port.`)
})