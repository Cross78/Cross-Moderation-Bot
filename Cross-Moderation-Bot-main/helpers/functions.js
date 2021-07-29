const Discord = require('discord.js');
const ayar = require('../settings');
const client = global.client = new Discord.Client();
const moment = require('moment');
require('moment-duration-format');
let embed = new Discord.MessageEmbed().setColor('RANDOM').setTimestamp()

let afkData = require('../models/afk.js');
//let ekipData = require('../models/ekip.js');
let penalData = require('../models/penal.js');
let yasaklıtagData = require('../models/yasaklıtag.js');



Promise.prototype.sil = function(time) {
    if (this) this.then(s => {
        if (s.deletable) s.delete({ timeout: time * 1000 }).catch(e => {});
    });
};


class Database {

    static async afk(guild, user, time, reason) {
        new afkData({ guildID: guild.id, userID: user.id, Tarih: time, Durum: true, Reason: reason }).save();
        if (user.manageable) user.setNickname(`[AFK] ${user.displayName}`).catch(e => {});
    }

    static async mute(guild, user, admin, cezaID, tip, durum, reason, start, finish, point) {
        new penalData({
            guildID: guild.id,
            userID: user.id,
            adminID: admin.id,
            cezaID: cezaID,
            Tip: tip,
            Durum: durum,
            Reason: reason,
            Start: start,
            Finish: finish,
            Point: point
        }).save();
    }

    static async vmute(guild, user, admin, cezaID, tip, durum, reason, start, finish, point) {
        new penalData({
            guildID: guild.id,
            userID: user.id,
            adminID: admin.id,
            cezaID: cezaID,
            Tip: tip,
            Durum: durum,
            Reason: reason,
            Start: start,
            Finish: finish,
            Point: point
        }).save();
    }

    static async jail(guild, user, admin, cezaID, tip, durum, reason, start, point) {
        new penalData({
            guildID: guild.id,
            userID: user.id,
            adminID: admin.id,
            cezaID: cezaID,
            Tip: tip,
            Durum: durum,
            Reason: reason,
            Start: start,
            Point: point
        }).save();
    }
    static async ban(guild, user, admin, cezaID, tip, durum, reason, start, point) {
        new penalData({
            guildID: guild.id,
            userID: user.id,
            adminID: admin.id,
            cezaID: cezaID,
            Tip: tip,
            Durum: durum,
            Reason: reason,
            Start: start,
            Point: point
        }).save();
    }
}
class Logger {

    static async mute(log, channel, user, admin, start, finish, reason, sure, cezaID) {
        let log2 = channel.guild.channels.cache.get(log)
        if (channel) channel.send(embed.setDescription(`${user}, Adlı kullanıcı **${sure}** boyunca **${reason}** sebebiyle metin kanallarında susturuldu! \`#${cezaID}\``))
        if (log2) log2.send(embed.setDescription(`
${user}, Adlı kullanıcı metin kanallarında susturuldu!

> **Yetkili:** ${admin} - (\`${admin.id}\`) 
> **Süre:** \`${sure}\`
> **Sebep:** \`${reason}\`
> **Bitiş:** \`${moment(finish).locale('tr').format('LLL')}\`
`))
    }

    static async vmute(log, channel, user, admin, start, finish, reason, sure, cezaID) {
        let log2 = channel.guild.channels.cache.get(log)
        if (channel) channel.send(embed.setDescription(`${user}, Adlı kullanıcı **${sure}** boyunca **${reason}** sebebiyle ses kanallarında susturuldu! \`#${cezaID}\``))
        if (log2) log2.send(embed.setDescription(`
${user}, Adlı kullanıcı ses kanallarında susturuldu!

> **Yetkili:** ${admin} - (\`${admin.id}\`) 
> **Süre:** \`${sure}\`
> **Sebep:** \`${reason}\`
> **Bitiş:** \`${moment(finish).locale('tr').format('LLL')}\`
`))
    }
    static async jail(log, channel, user, admin, reason, cezaID) {
        let log2 = channel.guild.channels.cache.get(log)
        if (channel) channel.send(embed.setDescription(`${user}, Adlı kullanıcı **${reason}** sebebiyle cezalıya atıldı! \`#${cezaID}\``))
        if (log2) log2.send(embed.setDescription(`
${user}, Adlı kullanıcı cezalıya atıldı!

> **Yetkili:** ${admin} - (\`${admin.id}\`) 
> **Sebep:** \`${reason}\`
`))
    }
    static async ban(log, channel, user, admin, reason, cezaID) {
        let log2 = channel.guild.channels.cache.get(log)
        if (channel) channel.send(embed.setDescription(`${user}, Adlı kullanıcı **${reason}** sebebiyle sunucudan yasaklandı! \`#${cezaID}\``))
        if (log2) log2.send(embed.setDescription(`
${user}, Adlı kullanıcı sunucudan yasaklandı!

> **Yetkili:** ${admin} - (\`${admin.id}\`) 
> **Sebep:** \`${reason}\`
`))
    }
}

class Kontrol {

    static async mute(guild) {
        let data = await penalData.find({ guildID: guild.id, Tip: 'MUTE' });
        data.forEach(async(d, index) => {
            if (d.Durum === true) {
                if (Date.now() >= d.Finish) {
                    let log = guild.channels.cache.get(ayar.channels.muteLog);
                    let member = guild.members.cache.get(d.userID);
                    if (!member) return;
                    if (log) log.send(embed.setDescription(`
                ${member} - (\`${member.id}\`) Adlı kullanıcının ses kanallarında susturulması kalktı!
                `))
                    await member.roles.remove(ayar.roles.muteRole);
                    d.Durum = false;
                    d.save();
                }
            }
        });
    }

    static async vmute(guild) {
        let data = await penalData.find({ guildID: guild.id, Tip: 'VMUTE' });
        data.forEach(async(d, index) => {
            if (d.Durum === true) {
                if (Date.now() >= d.Finish) {
                    let log = guild.channels.cache.get(ayar.channels.vMuteLog);
                    let member = guild.members.cache.get(d.userID);
                    if (!member) return;
                    if (log) log.send(embed.setDescription(`
                ${member} - (\`${member.id}\`) Adlı kullanıcının ses kanallarında susturulması kalktı!
                `))
                    await member.roles.remove(ayar.roles.vMuteRole);
                    d.Durum = false;
                    d.save();
                }
            }
        });
    }

    static async yasaklıtag(guild) {
        let data = await yasaklıtagData.find({ guildID: guild.id });
        let taglar = data.length > 0 ? data.map(s => s.Tag) : [];
        guild.members.cache.forEach(async(uye) => {
            if (taglar.some(tag => uye.user.tag.toLowerCase().includes(tag)) && !uye.roles.cache.has(ayar.roles.yasaklıTag)) {
                await uye.setNickname(`Yasaklı | Tag`).catch(e => {});
                await uye.roles.add(ayar.roles.yasaklıTag).catch(e => {});
            }
            if (!taglar.some(tag => !uye.user.tag.toLowerCase().includes(tag)) && uye.roles.cache.has(ayar.roles.yasaklıTag)) {
                await uye.setNickname(`• İsim | Yaş`).catch(e => {});
                await uye.roles.set(ayar.roles.unregisterRoles).catch(e => {});
            }
        })
    }

}


module.exports = { Database, Logger, Kontrol };