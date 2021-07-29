const Discord = require("discord.js")
const { Database, Logger } = require("../helpers/functions");
const ayar = require('../settings.js')
module.exports.run = async(client, message, args, embed) => {
    if (ayar.roles.muteStaff.some(s => !message.member.roles.cache.has(s)) && !message.member.hasPermission(8)) return message.channel.send(embed.setDescription(`${message.author}, Bu komutu kullanmak için yeterli yetkiye sahip değilsin!`)).sil(7);
    let top = message.guild.memberCount;
    let tagges = message.guild.members.cache.filter(s => ayar.guild.tagges.some(a => s.user.tag.toLowerCase().includes(a))).size
    let ses = message.guild.members.cache.filter(s => s.voice.channel).size
    let boost = message.guild.premiumSubscriptionCount;
    let boostlevel = message.guild.premiumTier;
    let online = message.guild.members.cache.filter(s => s.presence.status != "offline").size

    message.channel.send(embed.setDescription(`
> Sunucumuzda toplam **${top}** kullanıcı bulunmakta.
> Sunucumuzda toplam **${tagges}** kullanıcı bulunmakta.
> Seste toplam **${ses}** kullanıcı bulunmakta.
> Sunucumuzda toplam **${online}** kullanıcı bulunmakta.
> Sunucumuzda toplam **${boost}** takviye bulunmakta. (\`${boostlevel}. seviye\`)
`)).sil(15)
};
exports.config = {
    name: "say",
    usage: `${ayar.bot.botPrefix}say`,
    guildOnly: true,
    aliases: [],
    cooldown: 3000
};