const mongoose = require('mongoose');


const videoDetails = mongoose.Schema({
    _id: mongoose.SchemaTypes.ObjectId,
    channel: {
        name: String,
    },
    video: {
        name: String,
        url: String,
        previewUrl: String,
    },
    guest: {
        name: String,
        age: Number,
        profession: {
            type: String,
            default: ""
        },
        recommendation: {
            videoContent: [{
                type: {
                    type: String
                },
                name: String,
                timecode: String,
                url: {
                    type: String,
                    default: ""
                },
                comment: {
                    type: String,
                    default: ""
                },
                tags: [
                    "favorites" | "mention" | "notFavorites"
                ]
            }],
            audioContent: [{
                type: {
                    type: String
                },
                name: String,
                timecode: String,
                url: {
                    type: String,
                    default: ""
                },
                comment: {
                    type: String,
                    default: ""
                },
                tags: [
                    "favorites" | "mention" | "notFavorites"
                ]
            }],
            textContent: [{
                type: {
                    type: String
                },
                name: String,
                timecode: String,
                url: {
                    type: String,
                    default: ""
                },
                comment: {
                    type: String,
                    default: ""
                },
                tags: [
                    "favorites" | "mention" | "notFavorites"
                ]
            }],
        },
    },
    general: {
        description: {
            type: String,
            default: ""
        }
    },
    timestamp: String
});


module.exports = mongoose.model('videoDetails', videoDetails);;