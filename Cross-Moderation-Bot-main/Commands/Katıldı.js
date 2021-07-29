const Discord = require("discord.js")
const { Database, Logger } = require("../helpers/functions");
const ayar = require('../settings.js')
module.exports.run = async(client, message, args, embed) => {
    if (!message.member.hasPermission(8)) return message.channel.send(embed.setDescription(`${message.author}, Bu komutu kullanmak için yeterli yetkiye sahip değilsin!`)).sil(7);
    if (!message.member.voice.channel || message.member.voice.channel.id != ayar.channels.meeting) return message.channel.send(embed.setDescription(`Bu komutu kullanabilmek için toplantı ses kanalında bulunmalısın.`)).sil(7);
    let enaltyt = message.guild.roles.cache.get(ayar.roles.enAltYt)
    let uyeler = message.guild.members.cache.filter(s => s.roles.highest.position >= enaltyt.position);
    uyeler.array().forEach(async(member) => {
        if (member.voice.channel && member.voice.channel.id == ayar.channels.meeting && !member.roles.cache.has(ayar.roles.katıldı)) await member.roles.add(ayar.roles.katıldı).catch(e => {});
        if (!member.voice.channel || member.voice.channel && member.voice.channel.id != ayar.channels.meeting && member.roles.cache.has(ayar.roles.katıldı)) await member.roles.remove(ayar.roles.katıldı).catch(e => {});
    })
    message.channel.send(embed.setDescription(`
> **${uyeler.filter(s => s.voice.channel && s.voice.channel.id == ayar.channels.meeting && !s.roles.cache.has(ayar.roles.katıldı)).size}** Adet kullanıcıya katıldı rolü verilecek.
> **${uyeler.filter(s => !s.voice.channel && s.roles.cache.has(ayar.roles.katıldı) || s.voice.channel &&  s.voice.channel.id == ayar.channels.meeting && s.roles.cache.has(ayar.roles.katıldı)).size}** Adet kullanıcıdan katıldı rolü alınacak.
`)).sil(7);
};
exports.config = {
    name: "katıldı",
    usage: `${ayar.bot.botPrefix}katıldı`,
    guildOnly: true,
    aliases: [],
    cooldown: 3000
};