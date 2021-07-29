const Discord = require("discord.js")
const { Database } = require("../helpers/functions");
const ayar = require('../settings.js');
module.exports.run = async(client, message, args, embed) => {
    if (!message.member.roles.cache.has(ayar.roles.boosterRole)) return message.channel.send(embed.setDescription(`${message.author}, Bu komutu kullanmak için yeterli yetkiye sahip değilsin!`)).sil(7);
    let yasaklar = ["discord.gg/", ".gg/", "discord.gg", "https://discord.gg/"];
    let ism = args.slice(0).join(' ');
    if (ism.length > 32) return message.channel.send(embed.setDescription(`İsmin **32** Karakterden uzun olamaz!`)).sil(7);
    if (yasaklar.some(s => ism.includes(s))) return message.delete().catch(e => {})
    let name;
    if (ayar.guild.tagges.some(tag => message.author.tag.includes(tag))) {
        name = `${ayar.guild.nameTag} ${ism}`
    } else {
        name = `${ayar.guild.defaultTag} ${ism}`
    }
    message.member.setNickname(name).catch(e => {});
    message.channel.send(embed.setDescription(`${message.author}, Yeni ismin **${name}** :partying_face:`)).sil(7)
};
exports.config = {
    name: "booster",
    usage: `${ayar.bot.botPrefix}booster [Name]`,
    guildOnly: true,
    aliases: [],
    cooldown: 3000
};