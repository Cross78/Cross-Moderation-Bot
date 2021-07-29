const Discord = require("discord.js")
const { Database, Logger } = require("../helpers/functions");
const ayar = require('../settings.js')
module.exports.run = async(client, message, args, embed) => {
    let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
    if (!member) return message.channel.send(embed.setDescription(`${message.member}, Hatalı kullanım örnek: **${ayar.bot.botPrefix}git @Cross/ID**`)).sil(7);
    if (!message.member.voice.channel) return message.channel.send(embed.setDescription(`${message.member}, Önce bir ses kanalına katılmalısın!`)).sil(7)
    if (!member.voice.channel) return message.channel.send(embed.setDescription(`${message.member}, Etiketlenen kullanıcı bir ses kanalında değil!`)).sil(7)
    if (member.voice.channel.id == message.member.voice.channel.id) return message.channel.send(embed.setDescription(`${message.member}, Belirttiğin kullanıcı ile zaten aynı kanaldasınız!`)).sil(7)

    message.channel.send(embed.setDescription(`${member}, - ${message.member}, Senin ${message.member.voice.channel} kanalına çekmek istiyor, Kabul ediyor musun?`)).then(async m => {
        m.react(ayar.emojis.yes).catch(e => {})
        m.react(ayar.emojis.no).catch(e => {})

        let collector = m.createReactionCollector((reaction, user) => user.id == member.id, { max: 1, time: 25000, error: ['time'] });

        collector.on("collect", async(reaction, user) => {
            if (reaction.emoji.id == ayar.emojis.yes) {
                await m.delete();
                await member.voice.setChannel(message.member.voice.channel.id)
                message.channel.send(embed.setDescription(`${member}, Adlı kullanıcı ${message.member.voice.channel} adlı kanala taşındı!`)).sil(7);
            } else if (reaction.emoji.id == ayar.emojis.no) {
                await member.voice.setChannel(message.member.voice.channel.id)
                m.delete();
                message.channel.send(embed.setDescription(`${member}, Adlı kullanıcı teklifi reddetti!`)).sil(7);
            }
        })
    })
};
exports.config = {
    name: "çek",
    usage: `${ayar.bot.botPrefix}çek [@Cross/ID]`,
    guildOnly: true,
    aliases: ["cek"],
    cooldown: 3000
};