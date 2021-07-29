const Discord = require("discord.js")
const { Database, Logger } = require("../helpers/functions");
const ayar = require('../settings.js')
module.exports.run = async(client, message, args, embed) => {
    if (!message.member.hasPermission(8)) return message.channel.send(embed.setDescription(`${message.author}, Bu komutu kullanmak için yeterli yetkiye sahip değilsin!`)).sil(7);
    let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
    let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]) || message.guild.roles.cache.find(s => s.name.toLowerCase().includes(args.slice(1).join(' ')))

    if (!member || !role) return message.channel.send(embed.setDescription(`${message.member}, Geçerli bir üye ve rol belirtmelisin.`)).sil(7);

    if (member.roles.cache.has(role.id)) {
        await member.roles.remove(role.id).catch(e => {});
        message.channel.send(embed.setDescription(`${member}, Adlı kullanıcıya ${role} rolü alındı.`)).sil(7)
    } else {
        await member.roles.add(role.id).catch(e => {});
        message.channel.send(embed.setDescription(`${member}, Adlı kullanıcıya ${role} rolü verildi.`)).sil(7)
    }
};
exports.config = {
    name: "rol",
    usage: `${ayar.bot.botPrefix}rol [@Cross/ID] [@Role/ID/Name]`,
    guildOnly: true,
    aliases: ["r"],
    cooldown: 3000
};