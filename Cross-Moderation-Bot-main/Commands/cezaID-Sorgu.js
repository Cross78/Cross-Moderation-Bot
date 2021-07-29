const Discord = require("discord.js")
const { Database, Logger } = require("../helpers/functions");
const ayar = require('../settings.js')
const penalData = require('../models/penal.js')
const moment = require('moment')
module.exports.run = async(client, message, args, embed) => {
    if (ayar.roles.muteStaff.some(s => !message.member.roles.cache.has(s)) && !message.member.hasPermission(8)) return message.channel.send(embed.setDescription(`${message.author}, Bu komutu kullanmak için yeterli yetkiye sahip değilsin!`)).sil(7);
    if (!args[0] || (args[0] && isNaN(args[0]))) return message.channel.send(embed.setDescription(`${message.author}, Hatalı kullanım; \n \`\`\`Örnek: ${this.config.usage}\`\`\``));
    let data = await penalData.find({ guildID: message.guild.id, cezaID: args[0] });
    if (!data.length) return message.channel.send(embed.setDescription(`Bu ID'ye ait veri bulunamadı.`));
    data.map((d, index) => {
        let user = message.guild.members.cache.get(d.userID);
        let admin = message.guild.members.cache.get(d.adminID);
        embed.setDescription(`
Ceza: **${d.Tip}**
Sebep: **${d.Reason}**
Yetkili: ${admin ? admin : '**Bulunamadı**'}
Kullanıcı: ${user ? user : '**Bulunamadı**'}
ID: **${d.cezaID}**
Ceza Tarih: **${moment(d.Start).locale('tr').format('LLL')}**
Ceza Durum: **${d.Durum ? 'Aktif' : 'Deaktif'}**
Ceza Puanı: **${d.Point}**
    `)
            .setThumbnail(user ? user.user.avatarURL({ dynamic: true }) : message.author.avatarURL({ dynamic: true })).setAuthor(user ? user.user.username : message.author.username, user ? user.user.avatarURL({ dynamic: true }) : message.author.avatarURL({ dynamic: true }))
    });

    message.channel.send(embed)
};
exports.config = {
    name: "cezaID",
    usage: `${ayar.bot.botPrefix}cezasorgu [Number]`,
    guildOnly: true,
    aliases: ["cezasorgu", "cezaıdsorgu"],
    cooldown: 3000
};
