const mongoose = require("mongoose");

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
        age: String | null,
        profession: String | null,
    },
    recommendation: {
        videoContent: [{
            type: {
                type: String,
            },
            name: String,
            timecode: String,
            url: String || null,
            comment: String || null,
            tags: "favorites" | "mention" | "notFavorites",
        }, ],
        audioContent: [{
            type: {
                type: String,
            },
            name: String,
            timecode: String,
            url: String || null,
            comment: String || null,
            tags: "favorites" | "mention" | "notFavorites",
        }, ],
        textContent: [{
            type: {
                type: String,
            },
            name: String,
            timecode: String,
            url: String || null,
            comment: String || null,
            tags: "favorites" | "mention" | "notFavorites",
        }, ],
    },
    timestamp: String,
});

module.exports = mongoose.model("videoDetails", videoDetails);
