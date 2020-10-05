require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const PORT = 6587;

const TestRoutes = require('./api/routes/TestRoutes');



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