const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    link: {
        type: String,
        required: true
    },
    labels: {
        type: [String],
        required: false
    }
})

module.exports = Image = mongoose.model('image', ImageSchema);