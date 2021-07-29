const Discord = require("discord.js")
const { Database, Logger } = require("../helpers/functions");
const ayar = require('../settings.js')
const ekipData = require('../models/ekip.js');
const moment = require('moment');
const { findByIdAndUpdate } = require("../models/ekip.js");
const { locale } = require("moment");
const ekip = require("../models/ekip.js");
require('moment-duration-format');
module.exports.run = async(client, message, args, embed) => {
    if (!message.member.hasPermission(8)) return message.channel.send(embed.setDescription(`${message.author}, Bu komutu kullanmak için yeterli yetkiye sahip değilsin!`)).sil(7);
    let cmd = args[0];
    let data = await ekipData.find({ guildID: message.guild.id });
    let enaltyt = message.guild.roles.cache.get(ayar.roles.enAltYt);
    if (cmd == "ekle") {
        let ekipTag = args.slice(1).join(" ");
        if (!ekipTag) return message.channel.send(embed.setDescription(`Lütfen bir tag belirt.`)).sil(7);
        let kontrol = data.some(s => s.Tag == ekipTag);
        if (kontrol) return message.channel.send(embed.setDescription(`Bu tag zaten ekip olarak alınmış.`)).sil(7);
        new ekipData({ guildID: message.guild.id, adminID: message.author.id, Tag: ekipTag, Date: Date.now() }).save().then(async m => {
            let msg = await message.channel.send(embed.setDescription(`**${ekipTag}** tagı başarıyla ekip olarak alındı!`))
            let ekipuyeleri = message.guild.members.cache.filter(s => s.user.tag.toLowerCase().includes(ekipTag))
            setTimeout(async() => {
                msg.edit(embed.setDescription(`
        > **${ekipTag}** Ekibinin sunucu içi aktiflik durumu;
        > Toplam sahip oldukları üye sayısı: \`${ekipuyeleri.size}\`
        > Aktif olup seste olmayan ekip üyelerinin miktarı: \`${ekipuyeleri.filter(s => !s.voice.channel && s.presence.status !== 'offline').size}\`
        > Sunucumuzda yetkili olan ekip üyelerinin miktarı: \`${ekipuyeleri.filter(x => x.roles.highest.position >= enaltyt.position).size}\`
        > Sunucumuzda ses kanallarında bulunan ekip üyelerinin miktarı: \`${ekipuyeleri.filter(s => s.voice.channel).size}\`
        > Sunucumuzda tagımızı alan bizi destekleyen ekip üyelerinin miktarı: \`${ekipuyeleri.filter(s => ayar.guild.tagges.some(a => s.user.tag.toLowerCase().includes(a))).size}\`
        `)).sil(10);
            }, 5000)
        })
    } else if (cmd == "liste") {
        if (!data || !data.length) return message.channel.send(embed.setDescription(`Sunucuya ait ekip verisi bulunamadı!`)).sil(7);

        let listed = data.map(s => `> TAG: **${s.Tag}** Ekleyen: <@!${s.adminID}> Tarih: **${moment(s.Date).locale('tr').format('LLL')}**`).join('\n')
        message.channel.send(embed.setDescription(listed)).sil(15)
    } else if (cmd == "sil") {
        let hedefTag = args.slice(1).join(' ');
        if (!data.map(s => s.Tag).includes(hedefTag)) return message.channel.send(embed.setDescription(`Bu tag zaten ekip sisteminde bulunmamakta.`)).sil(7);
        await ekip.deleteOne({ Tag: hedefTag }).then(m => {
            message.channel.send(embed.setDescription(`${hedefTag} tagı ekip sisteminden kaldırıldı!`))
        }).catch(ee => {});
    } else if (cmd == "bilgi") {
        let hedefTag = args.slice(1).join(' ');
        if (!data.map(s => s.Tag).includes(hedefTag)) return message.channel.send(embed.setDescription(`Bu tag ekip sisteminde bulunmamakta.`)).sil(7);
        let ekipuyeleri = message.guild.members.cache.filter(s => s.user.tag.toLowerCase().includes(hedefTag));
        message.channel.send(embed.setDescription(`
   > **${hedefTag}** Ekibinin sunucu içi aktiflik durumu;
   > Toplam sahip oldukları üye sayısı: \`${ekipuyeleri.size}\`
   > Aktif olup seste olmayan ekip üyelerinin miktarı: \`${ekipuyeleri.filter(s => !s.voice.channel && s.presence.status !== 'offline').size}\`
   > Sunucumuzda yetkili olan ekip üyelerinin miktarı: \`${ekipuyeleri.filter(x => x.roles.highest.position >= enaltyt.position).size}\`
   > Sunucumuzda ses kanallarında bulunan ekip üyelerinin miktarı: \`${ekipuyeleri.filter(s => s.voice.channel).size}\`
   > Sunucumuzda tagımızı alan bizi destekleyen ekip üyelerinin miktarı: \`${ekipuyeleri.filter(s => ayar.guild.tagges.some(a => s.user.tag.toLowerCase().includes(a))).size}\`
   `)).sil(15);
    }

};
exports.config = {
    name: "ekip",
    usage: `${ayar.bot.botPrefix}ekip [ekle/sil/liste/bilgi]`,
    guildOnly: true,
    aliases: [],
    cooldown: 3000
};