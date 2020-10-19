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
    },
    guest: {
        name: String,
        age: Number,
        profession: { type: String, default: "" },
        recommendation: {
            videoContent: [{
                type: { type: String },
                name: String,
                timecode: String
            }],
            audioContent: [{
                type: { type: String },
                name: String,
                timecode: String
            }],
            textContent: [{
                type: { type: String },
                name: String,
                timecode: String
            }],
        },
    },
    general: {
        description: { type: String, default: "" }
    },
    timestamp: String
});


module.exports = mongoose.model('videoDetails', videoDetails);;