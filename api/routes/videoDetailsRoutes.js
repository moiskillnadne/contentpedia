const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const VideoDetailsSchema = require('../models/VideoDetails');

router.get('/', (req, res) => {
    res.send('hello server /api/');
});


// Database test
router.route('/db')
    .get((req, res) => {
        VideoDetailsSchema.find()
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
        const videoDetails = new VideoDetailsSchema({
            _id: new mongoose.Types.ObjectId(),
            channel: {
                name: req.body.channel.name,
            },
            video: {
                name: req.body.video.name,
                url: req.body.video.url,
                views: req.body.video.views
            },
            guest: {
                name: req.body.guest.name,
                age: req.body.guest.age,
            },
        });
        videoDetails.save()
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
        VideoDetailsSchema.updateOne({ _id: id }, { $set: updateOps })
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
        VideoDetailsSchema.remove({ _id: id })
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