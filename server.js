require('dotenv').config();
const express = require('express');
const app = express();
const Mongo = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

const PORT = 6587;
const DB_URL = `mongodb+srv://${process.env.DB_LOGIN}:${process.env.DB_PASS}@contentpedia.k4rqg.mongodb.net/contentpedia_dev?retryWrites=true&w=majority`;



app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json


app.get('/', (req, res) => {
    res.send('hello server');
});

app.get('/db-test-get', async(req, res) => {
    const client = new Mongo(DB_URL);
    await client.connect();

    try {
        let vdud_docs = await client.db('contentpedia_dev').collection('vdud').find();
        let result = [];

        await vdud_docs.forEach(element => {
            console.log(element);
            result.push(element);
        })

        res.send(result);
    } catch (error) {
        console.log(error);
    } finally {
        await client.close();
    }
});

app.post('/db-test-post', (req, res) => {
    console.log(req.body);
})



app.listen(PORT, () => {
    console.log(`Server was started on ${PORT} port.`)
})