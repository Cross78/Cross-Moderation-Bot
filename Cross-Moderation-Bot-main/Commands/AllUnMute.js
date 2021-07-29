const Discord = require("discord.js")
const { Database } = require("../helpers/functions");
const ayar = require('../settings.js')
module.exports.run = async(client, message, args, embed) => {
    if (!message.member.hasPermission(8)) return message.channel.send(embed.setDescription(`${message.author}, Bu komutu kullanmak için yeterli yetkiye sahip değilsin!`)).sil(7);
    if (!message.member.voice.channel) return message.react(ayar.emojis.no);
    if (message.member.voice.channel.members.size <= 1) return message.react(ayar.emojis.no)
    let uyeler = message.member.voice.channel.members;

    uyeler.forEach(async m => {
        setTimeout(async => {
            m.voice.setMute(false).catch(e => {});
        }, 1000)
    });
    message.channel.send(embed.setDescription(`${message.member.voice.channel}, Kanalındaki üyelerin susturması kaldırılıyor.`)).sil(7);
}
exports.config = {
    name: "allunmute",
    usage: `${ayar.bot.botPrefix}allunmute`,
    guildOnly: true,
    aliases: [],
    cooldown: 3000
};