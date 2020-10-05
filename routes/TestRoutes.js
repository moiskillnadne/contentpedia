const express = require('express');
const router = express.Router();
const Mongo = require('mongodb').MongoClient;

router.get('/', (req, res) => {
    res.send('hello server /test/');
});

router.get('/db/get', async(req, res) => {
    const client = new Mongo(process.env.DB_URI);
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

router.post('/db/post', (req, res) => {
    console.log(req.body);
})

router.post('/', (req, res) => {});


module.exports = router;