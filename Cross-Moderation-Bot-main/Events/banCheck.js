const Discord = require("discord.js");
const ayar = require('../settings.js');
const banData = require('../models/kalkmazban.js');
module.exports = async member => {

    let data = await banData.findOne({ guildID: member.guild.id });
    if (data && data.Members.includes(member.id)) {
        member.ban({ reason: "Cross Kalkmaz Ban" }).catch(e => {});
    }
};