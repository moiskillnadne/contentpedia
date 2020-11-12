const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const moment = require('moment');


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
        const body = req.body;
        const videoDetails = new VideoDetailsSchema({
            _id: new mongoose.Types.ObjectId(),
            channel: {
                name: body.channel.name,
            },
            video: {
                name: body.video.name,
                url: body.video.url,
                previewUrl: body.video.previewUrl
            },
            guest: {
                name: body.guest.name,
                age: body.guest.age,
                profession: body.guest.profession,
                recommendation: {
                    videoContent: body.guest.recommendation.videoContent,
                    audioContent: body.guest.recommendation.audioContent,
                    textContent: body.guest.recommendation.textContent,
                },
            },
            general: {
                description: body.general.description
            },
            timestamp: moment().format('MMMM Do YYYY, h:mm a')
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

router.delete('/db/deleteAll/:password', (req, res) => {
    const pass = req.params.password;
    if (process.env.DB_PASS === pass) {
        VideoDetailsSchema.deleteMany()
            .then(result => {
                res.status(200).json({
                    success: result
                })
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                })
            })
    } else {
        res.status(422).json({
            error: 'Password is incorrect'
        })
    }
})

router.route('/db/:testItemId')
    .get((req, res) => {
        const id = req.params.testItemId;
        VideoDetailsSchema.findById(id)
            .exec()
            .then(result => {
                res.status(200).json({
                    success: result
                })
            })
            .catch(err => {
                res.status(404).json({
                    error: err
                })
            })
    })
    .patch((req, res) => {
        const id = req.params.testItemId;
        let updateOps = {};
        for (const ops of req.body) {
            updateOps[ops.propName] = ops.value;
        }
        VideoDetailsSchema.updateOne({
                _id: id
            }, {
                $set: updateOps
            })
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
        VideoDetailsSchema.remove({
                _id: id
            })
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




module.exports = router;