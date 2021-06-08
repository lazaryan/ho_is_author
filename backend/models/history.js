import mongoose from 'mongoose'

const historySchema = new mongoose.Schema({
    entity_id: {
        type: String,
        unique: true
    },
    author_id: String,
    name: String,
    description: String,
    created: String,
    authors: String,
    keywords: String,
    cards: String
})

export default mongoose.model('History', historySchema)
