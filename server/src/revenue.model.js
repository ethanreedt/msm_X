const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Revenue = new Schema({
    description: { 
        type: String, 
        required: true 
    },
    amount: {
        type: Number,
        required: true
    },
    store: { 
        type: Schema.Types.ObjectID 
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    collections: 'revenues'
});

module.exports = mongoose.model('Revenue', Revenue);