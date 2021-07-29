const mongoose = require('mongoose');

let ekip = mongoose.Schema({
    guildID: String,
    adminID: String,
    Tag: String,
    Date: Number,
})


module.exports = mongoose.model("ekip", ekip)