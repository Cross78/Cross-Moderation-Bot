const Discord = require("discord.js")
const { Database, Logger } = require("../helpers/functions");
const ayar = require('../settings.js')
module.exports.run = async(client, message, args, embed) => {
    if (!message.member.hasPermission(8)) return message.channel.send(embed.setDescription(`${message.author}, Bu komutu kullanmak için yeterli yetkiye sahip değilsin!`)).sil(7);
    let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(s => s.name.toLowerCase().includes(args.slice(0).join(' ')))

    if (!role) return message.channel.send(embed.setDescription(`${message.member}, Geçerli bir rol belirtmelisin.`)).sil(7);

    let uyeler = role.members;
    let sestekiler = role.members.filter(s => s.voice.channel);
    let online = role.members.filter(s => s.presence.status != "offline")
    let taglilar = role.members.filter(s => ayar.guild.tagges.some(a => s.user.tag.toLowerCase().includes(a)));
    let rolrenk = role.hexColor;


    await message.channel.send(`${role} Rolündeki seste olmayan kullanıcılar`).sil(15)
    await message.channel.send(`${online.filter(s => !s.voice.channel).map(a => a).join('\n')}`, { split: true, code: "js" }).sil(15)

    await message.channel.send(embed.setDescription(`
> ${role} rol denetimi;
> Rolde toplam **${uyeler.size}** kullanıcı bulunmakta.
> Rolde toplam **${sestekiler.size}** seste kullanıcı bulunmakta.
> Rolde toplam **${taglilar.size}** taglı kullanıcı bulunmakta.
> Rolde toplam **${online.size}** aktif kullanıcı bulunmakta.
`)).sil(15)
};
exports.config = {
    name: "roldenetim",
    usage: `${ayar.bot.botPrefix}roldenetim [@Role/ID/Name]`,
    guildOnly: true,
    aliases: ["rdenetim"],
    cooldown: 3000
};