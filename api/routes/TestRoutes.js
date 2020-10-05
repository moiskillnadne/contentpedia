const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const TestSchema = require('../models/Test');

router.get('/', (req, res) => {
    res.send('hello server /test/');
});


// Database test
router.route('/db')
    .get((req, res) => {

    })
    .post((req, res) => {
        console.log(req.body);
        const testItem = new TestSchema({
            _id: new mongoose.Types.ObjectId(),
            title: req.body.title,
            name: req.body.name,
            age: req.body.age
        });
        testItem.save()
            .then(result => {
                console.log(result);
                res.status(200).json({
                    success: result
                })
            })
            .catch(err => {
                console.log(err);
            });

    })

router.post('/', (req, res) => {});


module.exports = router;