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
    let sebep = args.slice(1).join(' ')
    if (!member || !sebep) return message.channel.send(embed.setDescription(`${message.member}, Hatalı kullanım. Örnek: **${ayar.bot.botPrefix}jail @Cross/ID [Reason]**`)).sil(7)

    let memberData = await penalData.find({ guildID: message.guild.id, userID: member.id })
    let durumData = await penalData.find({ guildID: message.guild.id, userID: member.id, Tip: "JAIL" });
    let durum = durumData.some(s => s.Durum == true);
    if (durum) return message.channel.send(embed.setDescription(`${member}, Adlı kullanıcının aktif bir **[JAIL]** cezası bulunmakta.`)).sil(7);

    let count = await penalData.countDocuments().exec();
    let cezaID = count ? count += 1 : 1;
    if (member.id == message.author.id) return message.react(ayar.emojis.no)
    if (member.id == client.user.id) return message.react(ayar.emojis.no);
    if (member.user.bot) return message.react(ayar.emojis.no);
    if (member.permissions.has(8)) return message.channel.send(embed.setDescription(`${message.member}, Yönetici bir kullanıcıya karışamam.`)).sil(7)
    if (member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(embed.setDescription(`${message.member}, Bu kullanıcı sizden üst/aynı pozisyonda.`)).sil(7)


    if (memberData.some(s => s.Point >= 5)) {
        let puanKontrol = memberData.map((d, index) => d.Point).reduce((a, b) => a + b);
        if (puanKontrol > 75) {
            member.ban({ reason: 'Ceza Puan 75+' });
            return message.channel.send(embed.setDescription(`${member} Adlı kullanıcının ceza puan'ı **75** ve üstü olduğu için yasaklandı!`)).sil(7);
        }
    }
    await member.roles.set([ayar.roles.jailRole]).catch(e => { console.log(e) });
    Database.jail(message.guild, member, message.author, cezaID, "JAIL", true, sebep, Date.now(), 10)
    Logger.jail(ayar.channels.jailLog, message.channel, member, message.author, sebep, cezaID)


};
exports.config = {
    name: "jail",
    usage: `${ayar.bot.botPrefix}jail [@Cross/ID] [Reason]`,
    guildOnly: true,
    aliases: ["cezalı", "karantina"],
    cooldown: 3000
};