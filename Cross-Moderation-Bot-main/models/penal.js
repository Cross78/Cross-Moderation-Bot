const mongoose = require('mongoose');


let penal = mongoose.Schema({
    guildID: String,
    userID: String,
    adminID: String,
    cezaID: Number,
    Tip: String,
    Durum: Boolean,
    Reason: String,
    Start: Number,
    Finish: Number,
    Point: Number
})
module.exports = mongoose.model("penal", penal)