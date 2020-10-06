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
        TestSchema.find()
            .exec()
            .then(items => {
                if (items.length > 0) {
                    res.status(200).json(items);
                } else {
                    res.status(204).json({
                        message: 'Items not found'
                    });
                }
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                })
            });
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
                res.status(200).json({
                    success: result
                })
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                })
            });
    })

router.route('/db/:testItemId')
    .patch((req, res) => {
        const id = req.params.testItemId;
        let updateOps = {};
        for (const ops of req.body) {
            updateOps[ops.propName] = ops.value;
        }
        TestSchema.updateOne({ _id: id }, { $set: updateOps })
            .exec()
            .then(result => {
                res.status(200).json({
                    success: result
                });
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });
    })
    .delete((req, res) => {
        const id = req.params.testItemId;
        TestSchema.remove({ _id: id })
            .exec()
            .then(result => {
                res.status(200).json({
                    success: result
                });
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });
    })

router.post('/', (req, res) => {});


module.exports = router;