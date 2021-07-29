const Discord = require("discord.js")
const { Database, Logger } = require("../helpers/functions");
const ayar = require('../settings.js')
module.exports.run = async(client, message, args, embed) => {
    if (!message.member.hasPermission(8)) return message.channel.send(embed.setDescription(`${message.author}, Bu komutu kullanmak için yeterli yetkiye sahip değilsin!`)).sil(7);
    let everyone = message.guild.roles.cache.find(a => a.name === "@everyone");
    let permObjesi = {};
    let everPermleri = message.channel.permissionOverwrites.get(everyone.id);
    everPermleri.allow.toArray().forEach(p => {
        permObjesi[p] = true;
    });
    everPermleri.deny.toArray().forEach(p => {
        permObjesi[p] = false;
    });
    if (message.channel.permissionsFor(everyone).has('SEND_MESSAGES')) {
        permObjesi["SEND_MESSAGES"] = false;
        message.channel.createOverwrite(everyone, permObjesi);
        message.channel.send(embed.setDescription("Kanal kilitlendi!")).then(m => m.delete({ timeout: 7000 }) && message.delete({ timeout: 7000 }))
    } else {
        permObjesi["SEND_MESSAGES"] = true;
        message.channel.createOverwrite(everyone, permObjesi);
        message.channel.send(embed.setDescription("Kanal kilidi açıldı!")).then(m => m.delete({ timeout: 7000 }) && message.delete({ timeout: 7000 }))
    };
};
exports.config = {
    name: "kilit",
    usage: `${ayar.bot.botPrefix}kilit`,
    guildOnly: true,
    aliases: ["lock", "kanalkilit"],
    cooldown: 3000
};