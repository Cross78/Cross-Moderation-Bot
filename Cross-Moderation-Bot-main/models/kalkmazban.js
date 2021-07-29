const mongoose = require('mongoose');

let kalkmazban = mongoose.Schema({
    guildID: String,
    Members: { type: Array, default: [] }
})


module.exports = mongoose.model("kalkmazban", kalkmazban)