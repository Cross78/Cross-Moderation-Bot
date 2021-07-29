const Discord = require("discord.js")
const moment = require('moment');
const { Database } = require("../helpers/functions");
require('moment-duration-format');
let afkData = require('../models/afk.js');
const ayar = require('../settings.js')
module.exports.run = async(client, message, args, embed) => {
    let yasaklar = ["discord.gg/", ".gg/", "discord.gg", "https://discord.gg/"];
    let data = await afkData.find({ guildID: message.guild.id, userID: message.author.id })
    let durum = data.some(s => s.Durum == true);
    if (durum) return message.channel.send(embed.setDescription(`Zaten afk modundasın!`)).sil(7);
    let sebep = args.slice(0).join(' ') || "Belirtilmemiş."
    if (sebep && yasaklar.some(s => sebep.toLowerCase().includes(s))) {
        message.channel.send(embed.setDescription(`Afk sebebine **reklam** koyamazsın!`)).sil(7)
        message.delete();
    }
    message.channel.send(embed.setDescription(`${message.member}, Adlı kullanıcı **${sebep}** sebebiyle afk oldu!`)).sil(7);
    Database.afk(message.guild, message.member, Date.now(), sebep);
};
exports.config = {
    name: "afk",
    usage: `${ayar.bot.botPrefix}afk [reason]`,
    guildOnly: true,
    aliases: [],
    cooldown: 3000
};