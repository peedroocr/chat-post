const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
    name: String,
    description: String
});

module.exports = mongoose.model('TestPCR', shopSchema);