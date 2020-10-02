const express = require('express');
const app = express();

const PORT = 6587;


app.get('/', (req, res) => {
    res.send('Hello server');
});



app.listen(PORT, () => {
    console.log(`Server was started on ${PORT} port.`)
})