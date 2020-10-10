require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const PORT = 6587;
mongoose.connect(process.env.DB_URI_PROD, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const TestRoutes = require('./api/routes/TestRoutes');
const videoDetailsRoutes = require('./api/routes/videoDetailsRoutes');


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json


// Routes
app.use('/test/', TestRoutes);
app.use('/api/', videoDetailsRoutes);


app.get('/', (req, res) => {
    res.send('hello server');
});


// Launch server
app.listen(PORT, () => {
    console.log(`Server was started on ${PORT} port.`)
})