const mongoose = require('mongoose')

const historySchema = mongoose.Schema({
    entity_id: {
        type: String,
        unique: true
    },
    author_id: String,
    title: String,
    description: String
})

module.exports = mongoose.model('History', historySchema)
