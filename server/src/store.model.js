const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Store = new Schema({
    title: {
        type: String,
        required: true
    }
}, {
    collections: 'stores'
});

module.exports = mongoose.model('Store', Store);