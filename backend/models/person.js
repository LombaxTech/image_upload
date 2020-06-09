const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    avatar: {
        data: Buffer,
        contentType: String
    }
})

const personModel = mongoose.model('Person', personSchema);

module.exports = personModel;