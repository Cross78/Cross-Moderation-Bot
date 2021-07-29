const Discord = require("discord.js")
const { Database, Logger } = require("../helpers/functions");
const ayar = require('../settings.js')
module.exports.run = async(client, message, args, embed) => {
    if (!message.member.hasPermission(8)) return message.channel.send(embed.setDescription(`${message.author}, Bu komutu kullanmak için yeterli yetkiye sahip değilsin!`)).sil(7);
    let kanallar = message.guild.channels.cache.filter(s => s.parentID == ayar.channels.pubCategoryID).array();
    if (!message.member.voice.channel) return message.react(ayar.emojis.no).catch(e => {})
    if (message.member.voice.channel.members.size <= 1) return message.react(ayar.emojis.no).catch(e => {})
    let uyeler = message.member.voice.channel.members.array();

    uyeler.forEach(async member => {
        member.voice.setChannel(kanallar[Math.floor(Math.random() * kanallar.length)]).catch(e => {});
    });
    message.channel.send(embed.setDescription(`**${message.member.voice.channel.members.size}** Adet kullanıcı random public kanallara dağıtılıyor..`))
};
exports.config = {
    name: "dağıt",
    usage: `${ayar.bot.botPrefix}dağıt`,
    guildOnly: true,
    aliases: [],
    cooldown: 3000
};