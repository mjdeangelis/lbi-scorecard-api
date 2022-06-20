const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const courseSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    slope: Number,
    holes: [{
        number: Number,
        par: Number,
        handicap: Number,
        yards: Number
    }]
});

module.exports = mongoose.model('Course', courseSchema);
