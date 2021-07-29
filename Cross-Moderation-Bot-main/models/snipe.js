const mongoose = require('mongoose');

const snipe = mongoose.Schema({
    guildID: String,
    userID: String,
    mesaj: String,
    zaman: Number
});

module.exports = mongoose.model('snipe', snipe)