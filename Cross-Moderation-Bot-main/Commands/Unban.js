const Discord = require("discord.js")
const { Database, Logger } = require("../helpers/functions");
const ayar = require('../settings.js')
const penalData = require('../models/penal.js')
module.exports.run = async(client, message, args, embed) => {
    if (ayar.roles.banStaff.some(s => !message.member.roles.cache.has(s)) && !message.member.hasPermission(8)) return message.channel.send(embed.setDescription(`${message.author}, Bu komutu kullanmak için yeterli yetkiye sahip değilsin!`)).sil(7);
    let member = await client.users.fetch(args[0]);
    if (!member) return message.channel.send(embed.setDescription(`${message.member}, Geçerli bir üye belirtmelisin.`));

    let ban = await message.guild.fetchBans()
    if (!ban.map(s => s.user.id).includes(member.id)) return message.channel.send(embed.setDescription(`Bu kullanıcı zaten yasaklanmamıs`))

    await message.guild.members.unban(member.id).catch(e => {})
    message.channel.send(embed.setDescription(`${member.toString()} - (\`${member.id}\`) Adlı kullanıcının yasağı kaldırıldı`))
};
exports.config = {
    name: "unban",
    usage: `${ayar.bot.botPrefix}unban [ID]`,
    guildOnly: true,
    aliases: [],
    cooldown: 3000
};