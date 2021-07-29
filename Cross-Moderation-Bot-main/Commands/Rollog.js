const Discord = require("discord.js")
const { Database, Logger } = require("../helpers/functions");
const ayar = require('../settings.js')
const rolData = require('../models/rollog.js');
const moment = require('moment')
module.exports.run = async(client, message, args, embed) => {
    if (!message.member.hasPermission(8)) return message.channel.send(embed.setDescription(`${message.author}, Bu komutu kullanmak için yeterli yetkiye sahip değilsin!`)).sil(7);
    let member = message.guild.member(message.guild.members.cache.get(args[0]) || message.mentions.members.first());
    if (!member) return message.channel.send(embed.setDescription(`${message.member}, Bir kullanıcı etiketle`)).sil(7)
    let data = await rolData.find({ guildID: message.guild.id, userID: member.id });
    let yes = client.emojis.cache.get(ayar.emojis.yes)
    let no = client.emojis.cache.get(ayar.emojis.no)
    if (!data || !data.length) return message.channel.send(embed.setDescription(`${member}, Kullanıcısına ait rol verisi bulunamadı.`)).sil(7)
    let listed = data.map((value, index) => `${value.Type.replace("add",yes).replace("remove",no)} Rol: ${message.guild.roles.cache.get(value.Role)} Yetkili: ${message.guild.members.cache.get(value.adminID).toString()}\nTarih **${moment(value.Date).locale('tr').format('LLL')}** `).slice(data.length > 10 ? data.length - 1 : 0, data.length).join('\n─────────────────\n')
    message.channel.send(embed.setDescription(`
${member}, Kullanıcısının  son **10** rol bilgileri görüntülenmektedir.\n
${listed}`).setAuthor(member.user.tag, member.user.avatarURL({ dynamic: true }))).sil(15);
};
exports.config = {
    name: "rollog",
    usage: `${ayar.bot.botPrefix}rollog [@Cross/ID]`,
    guildOnly: true,
    aliases: [],
    cooldown: 3000
};