const mongoose = require('mongoose');

let rollog = mongoose.Schema({
    guildID: String,
    userID: String,
    adminID: String,
    Role: String,
    Type: String,
    Date: Number,
})
module.exports = mongoose.model("rollog", rollog)