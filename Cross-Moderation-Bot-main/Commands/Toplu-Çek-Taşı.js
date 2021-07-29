const Discord = require("discord.js")
const { Database, Logger } = require("../helpers/functions");
const ayar = require('../settings.js')
module.exports.run = async(client, message, args, embed) => {
    if (!message.member.hasPermission(8)) return message.channel.send(embed.setDescription(`${message.author}, Bu komutu kullanmak için yeterli yetkiye sahip değilsin!`)).sil(7);
    let cmd = args[0];
    let channel = message.guild.channels.cache.get(args[1]);

    if (cmd == "taşı") {
        if (!message.member.voice.channel) return message.react(ayar.emojis.no);
        if (message.member.voice.channel.members.size <= 1) return message.react(ayar.emojis.no);
        let members = message.member.voice.channel.members.array();
        if (!channel) return message.channel.send(embed.setDescription(`${message.member}, Bir kanal ID belirt.`)).sil(7);
        members.forEach(async m => {
            m.voice.setChannel(channel.id).catch(e => {});
        })
        message.channel.send(embed.setDescription(`**${message.member.voice.channel.members.size}** Adet kullanıcı ${channel} kanalına taşındı!`)).sil(7);
    } else if (cmd == "çek") {
        if (!message.member.voice.channel) return message.react(ayar.emojis.no);
        if (!channel) return message.channel.send(embed.setDescription(`${message.member}, Bir kanal ID belirt.`)).sil(7);
        let members = channel.members.array();
        members.forEach(async m => {
            m.voice.setChannel(message.member.voice.channel.id).catch(e => {});
        })
        message.channel.send(embed.setDescription(`**${channel.members.size}** Adet kullanıcı ${message.member.voice.channel} kanalına taşındı!`)).sil(7);

    } else {
        message.channel.send(embed.setDescription(`
**TOPLU TAŞIMA/ÇEKME KOMUTLARI**

> **${ayar.bot.botPrefix}toplu çek** Belirttiğiniz kanaldaki üyeleri sizin kanalınıza taşır.
> 
> **${ayar.bot.botPrefix}toplu taşı** Sizin kanalınızdaki üyeleri belirttiğiniz kanala taşır.
`).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))).sil(7);
    }
};
exports.config = {
    name: "toplu",
    usage: `${ayar.bot.botPrefix}toplu [çek/taşı] [@Channel/ID]`,
    guildOnly: true,
    aliases: [],
    cooldown: 3000
};