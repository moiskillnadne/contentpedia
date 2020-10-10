const mongoose = require('mongoose');


const videoDetails = mongoose.Schema({
    _id: mongoose.SchemaTypes.ObjectId,
    channel: {
        name: String,
    },
    video: {
        name: String,
        url: String,
        previewUrl: { type: String, default: "" },
        views: Number
    },
    guest: {
        name: String,
        age: Number,
        profession: { type: String, default: "" },
        // recommendation: {
        //     videoContent: [{
        //         type: { type: String },
        //         name: String,
        //         timecode: String
        //     }],
        //     audioContent: [{
        //         type: { type: String },
        //         name: String,
        //         timecode: String
        //     }],
        //     textContent: [{
        //         type: { type: String },
        //         name: String,
        //         timecode: String
        //     }],
        //     extra: [{
        //         type: { type: String },
        //         name: String,
        //         timecode: String,
        //         description: String,
        //     }],
        // },
    },
});


module.exports = mongoose.model('videoDetails', videoDetails);;