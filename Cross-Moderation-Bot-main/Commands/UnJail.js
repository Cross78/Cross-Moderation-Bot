const Discord = require("discord.js")
const { Database, Logger } = require("../helpers/functions");
const ayar = require('../settings.js')
const penalData = require('../models/penal.js')
const ms = require('ms');
const moment = require('moment')
require('moment-duration-format')
moment.locale('tr');
module.exports.run = async(client, message, args, embed) => {
    if (ayar.roles.jailStaff.some(s => !message.member.roles.cache.has(s)) && !message.member.hasPermission(8)) return message.channel.send(embed.setDescription(`${message.author}, Bu komutu kullanmak için yeterli yetkiye sahip değilsin!`)).sil(7);
    let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
    if (!member) return message.channel.send(embed.setDescription(`${message.member}, Hatalı kullanım. Örnek: **${ayar.bot.botPrefix}unjail @Cross/ID**`)).sil(7)

    let memberData = await penalData.find({ guildID: message.guild.id, userID: member.id })
    let durumData = await penalData.find({ guildID: message.guild.id, userID: member.id, Tip: "JAIL" });
    let durum = durumData.some(s => s.Durum == false);
    if (durum || !durumData.length) return message.channel.send(embed.setDescription(`${member}, Adlı kullanıcının aktif bir **[JAIL]** cezası bulunmamakta!`)).sil(7);


    if (member.id == message.author.id) return message.react(ayar.emojis.no)
    if (member.id == client.user.id) return message.react(ayar.emojis.no);
    if (member.user.bot) return message.react(ayar.emojis.no);
    if (member.permissions.has(8)) return message.channel.send(embed.setDescription(`${message.member}, Yönetici bir kullanıcıya karışamam.`)).sil(7)
    if (member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(embed.setDescription(`${message.member}, Bu kullanıcı sizden üst/aynı pozisyonda.`)).sil(7)

    durumData.forEach(async(d, index) => {
        if (d.Durum == true) {
            member.roles.set(ayar.roles.unregisterRoles).catch(err => console.log('rol verme hatası'))
            if (client.channels.cache.get(ayar.channels.jailLog)) client.channels.cache.get(ayar.channels.jailLog).send(embed.setDescription(`${member}, Adlı kullanıcının karantina cezası kaldırıldı.`))
            d.Durum = false;
            d.save();
        } else {
            return;
        }
    });



};
exports.config = {
    name: "unjail",
    usage: `${ayar.bot.botPrefix}unjail [@Cross/ID]`,
    guildOnly: true,
    aliases: ["unjailmute"],
    cooldown: 3000
};