const mongoose = require('mongoose');
let afk = mongoose.Schema({
    guildID: String,
    userID: String,
    Tarih: Number,
    Reason: String,
    Durum: Boolean
})


module.exports = mongoose.model("afk", afk)