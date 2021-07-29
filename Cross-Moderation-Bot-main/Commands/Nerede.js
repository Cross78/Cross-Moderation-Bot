const Discord = require("discord.js")
const { Database, Logger } = require("../helpers/functions");
const ayar = require('../settings.js')
module.exports.run = async(client, message, args, embed) => {
    if (!message.member.hasPermission(8)) return message.channel.send(embed.setDescription(`${message.author}, Bu komutu kullanmak için yeterli yetkiye sahip değilsin!`)).sil(7);
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let user = message.guild.member(member)
    if (!user) return message.react(ayar.no)
    if (!user.voice.channel) return message.react(ayar.no)
    let on = client.emojis.cache.get(ayar.emojis.on)
    let off = client.emojis.cache.get(ayar.emojis.off)

    let kanal = user.voice.channel
    let mik = user.voice.selfMute ? off : on
    let kulak = user.voice.selfDeaf ? off : on
    let yayın = user.voice.streaming ? on : off
    let cam = user.voice.selfVideo ? on : off
    let kanalinfo = user.voice.channel.userLimit
    let kanaldakiler = message.guild.members.cache.filter(x => x.voice.channel && x.voice.channel.id === kanal.id).size
    if (kanal && user.voice.channel) {
        message.channel.send(embed.setDescription(`
${user} Adlı kullanıcı ${kanal} adlı ses kanalında.
Mikrofonu: ${mik}
Kulaklığı: ${kulak}
Yayın Bilgisi: ${yayın}
Kamera Bilgisi: ${cam}
Kanal Bilgisi: \`${kanaldakiler}/${kanalinfo}\`
`)).sil(7)
    }
};
exports.config = {
    name: "nerede",
    usage: `${ayar.bot.botPrefix}nerede [@Cross/ID]`,
    guildOnly: true,
    aliases: ["sesbilgi"],
    cooldown: 3000
};