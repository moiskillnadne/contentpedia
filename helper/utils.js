module.exports = {
    formatterToPreviewLink: function(videoId) {
        return `http://i1.ytimg.com/vi/${videoId}/maxresdefault.jpg`
    },
    getVideoIDFromUrl: function(videoUrl) {
        return videoUrl.replace('https://www.youtube.com/watch?v=', '')
    }
}
