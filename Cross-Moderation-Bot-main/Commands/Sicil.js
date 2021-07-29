const Discord = require("discord.js")
const { Database, Logger } = require("../helpers/functions");
const ayar = require('../settings.js')
const penalData = require('../models/penal.js')
const ms = require('ms');
const moment = require('moment')
require('moment-duration-format')
moment.locale('tr');
module.exports.run = async(client, message, args, embed) => {
    if (ayar.roles.muteStaff.some(s => !message.member.roles.cache.has(s)) && !message.member.hasPermission(8)) return message.channel.send(embed.setDescription(`${message.author}, Bu komutu kullanmak için yeterli yetkiye sahip değilsin!`)).sil(7);
    let yes = client.emojis.cache.get(ayar.emojis.yes)
    let no = client.emojis.cache.get(ayar.emojis.no)
    let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
    if (!member) return message.channel.send(embed.setDescription(`${message.member}, Hatalı kullanım. Örnek: **${ayar.bot.botPrefix}sicil @Cross/ID**`)).sil(7)
    let memberData = await penalData.find({ guildID: message.guild.id, userID: member.id })
    if (!memberData || !memberData.length) return message.channel.send(embed.setDescription(`${member}, Adlı kullanıcının sicil geçmişi bulunmamakta`))
    let list = memberData.length > 0 ? memberData.map((value, i) => `\`${i+1}\` **[${value.Tip}]** <@!${value.adminID}> tarafından **${value.Reason}** sebebiyle ${value.Durum == true ? yes : no}`) : ""

    message.channel.send(embed.setDescription(list))
};
exports.config = {
    name: "sicil",
    usage: `${ayar.bot.botPrefix}sicil [@Cross/ID]`,
    guildOnly: true,
    aliases: [],
    cooldown: 3000
};