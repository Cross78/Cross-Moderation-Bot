const { MessageEmbed } = require("discord.js");
const snipe = require("../models/snipe")
const moment = require("moment");
require('moment-duration-format');
const ayar = require('../settings.js')
module.exports.run = async(client, message, args, embed) => {
    let sıra = args[0]
    let numbers = [1, 2, 3, 4, 5];
    let snipeData = await snipe.find({ guildID: message.guild.id });
    let list = snipeData.map((data, index) => `[${moment.duration(Date.now() - data.zaman).format("D [Gün], H [Saat], m [Dakika], s [Saniye]")}] ${message.guild.members.cache.get(data.userID) ? message.guild.members.cache.get(data.userID) : 'Bulunamadı'}: **${data.mesaj}**`);

    if (!sıra) {
        return message.channel.send(embed.setDescription(`
${list.slice(snipeData.length - 1, snipeData.length)}
    `))
    }
    if (!numbers.some(s => sıra.includes(s))) return message.channel.send(embed.setDescription(`Lütfen geçerli bir rakam giriniz.`))
    if (sıra) {
        return message.channel.send(embed.setDescription(`${list.slice(snipeData.length > sıra ? snipeData.length - sıra : 0, snipeData.length).join('\n')}`))
    }
}
exports.config = {
    name: "snipe",
    usage: `${ayar.bot.botPrefix}snipe [Number]`,
    guildOnly: true,
    aliases: [],
    cooldown: 3000
};;