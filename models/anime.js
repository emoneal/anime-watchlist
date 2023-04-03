const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Anime Blueprint

const animeSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    genre: {
        type: String,
        require: true
    },
    episodes: {
        type: Number,
        required: true
    },
    synopsis: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Anime", animeSchema)