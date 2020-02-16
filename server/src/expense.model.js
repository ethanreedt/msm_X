const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Expense = new Schema({
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
    collections: 'expenses'
});

module.exports = mongoose.model('Expense', Expense);