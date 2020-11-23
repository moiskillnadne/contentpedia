const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const moment = require('moment')

const VideoDetailsSchema = require('../models/VideoDetails')

const utils = require('../../helper/utils')

router.get('/', (req, res) => {
    res.send('hello server /api/')
})

router
    .route('/db')
    .get((req, res) => {
        console.log('Sending video list form dev server..')
        VideoDetailsSchema.find()
            .exec()
            .then((items) => {
                if (items.length > 0) {
                    res.status(200).json(items)
                } else {
                    res.status(204).json({
                        message: 'Items not found',
                    })
                }
            })
            .catch((err) => {
                res.status(500).json({
                    error: err,
                })
            })
    })
    .post((req, res) => {
        const {
            channel,
            video,
            guest,
            recommendation
        } = req.body
        console.log(req.body)
        const videoID = utils.getVideoIDFromUrl(video.url)
        const videoDetails = new VideoDetailsSchema({
            _id: new mongoose.Types.ObjectId(),
            channel: {
                name: channel.name,
            },
            video: {
                name: video.name,
                url: video.url,
                previewUrl: utils.formatterToPreviewLink(videoID),
            },
            guest: {
                name: guest.name,
                age: guest.age || null,
                profession: guest.profession || null,
            },
            recommendation: {
                videoContent: recommendation.videoContent,
                audioContent: recommendation.audioContent,
                textContent: recommendation.textContent,
            },
            timestamp: moment().format('MMMM Do YYYY, h:mm a'),
        })
        console.log(videoDetails)
        videoDetails
            .save()
            .then((result) => {
                console.log('Posting new video via dev server..')
                res.status(200).json({
                    success: result,
                })
            })
            .catch((err) => {
                console.log('Posting new video was failed!')
                res.status(500).json({
                    error: err,
                    msg: 'Not saved',
                })
            })
    })

router.delete('/db/deleteAll/:password', (req, res) => {
    const pass = req.params.password
    if (process.env.DB_PASS === pass) {
        VideoDetailsSchema.deleteMany()
            .then((result) => {
                res.status(200).json({
                    success: result,
                })
            })
            .catch((err) => {
                res.status(500).json({
                    error: err,
                })
            })
    } else {
        res.status(422).json({
            error: 'Password is incorrect',
        })
    }
})

router
    .route('/db/:testItemId')
    .get((req, res) => {
        const id = req.params.testItemId
        VideoDetailsSchema.findById(id)
            .exec()
            .then((result) => {
                res.status(200).json({
                    success: result,
                })
            })
            .catch((err) => {
                res.status(404).json({
                    error: err,
                })
            })
    })
    .patch((req, res) => {
        const id = req.params.testItemId
        let updateOps = {}
        for (const ops of req.body) {
            updateOps[ops.propName] = ops.value
        }
        VideoDetailsSchema.updateOne({
                _id: id,
            }, {
                $set: updateOps,
            }, )
            .exec()
            .then((result) => {
                res.status(200).json({
                    success: result,
                })
            })
            .catch((err) => {
                res.status(500).json({
                    error: err,
                })
            })
    })
    .delete((req, res) => {
        const id = req.params.testItemId
        VideoDetailsSchema.remove({
                _id: id,
            })
            .exec()
            .then((result) => {
                console.log('Item was deleted successfully!');
                res.status(200).json({
                    success: result,
                })
            })
            .catch((err) => {
                res.status(500).json({
                    error: err,
                })
            })
    })

module.exports = router
