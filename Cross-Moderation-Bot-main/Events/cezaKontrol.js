const Discord = require("discord.js");
const ayar = require('../settings.js');
const punish = require('../models/penal.js')
module.exports = async member => {

    let cdata = await punish.find({ guildID: member.guild.id, userID: member.id, Tip: 'MUTE' });
    let vdata = await punish.find({ guildID: member.guild.id, userID: member.id, Tip: 'VMUTE' });
    let jdata = await punish.find({ guildID: member.guild.id, userID: member.id, Tip: 'JAIL' });
    let clog = member.guild.channels.cache.get(ayar.channels.muteLog);
    let vlog = member.guild.channels.cache.get(ayar.channels.vMuteLog);
    let jlog = member.guild.channels.cache.get(ayar.channels.jailLog);
    let embed = new Discord.MessageEmbed().setColor(`RANDOM`).setAuthor(member.guild.name, member.guild.iconURL({ dynamic: true }));

    cdata.forEach(async(data, index) => {
        if (data.Durum === true) {
            member.roles.add(ayar.roles.muteRole);
            if (clog) clog.send(embed.setDescription(`${member} Adlı kullanıcının aktif bir **[MUTE]** cezası varken sunucudan çıktığı için muteli rolü verildi.`));
        }
    })

    vdata.forEach(async(data, index) => {
        if (data.Durum === true) {
            member.roles.add(ayar.roles.vMuteRole)
            if (vlog) vlog.send(embed.setDescription(`${member} Adlı kullanıcının aktif bir **[VOICE-MUTE]** cezası varken sunucudan çıktığı için muteli rolü verildi.`));
        }
    })

    jdata.forEach(async(data, index) => {
        if (data.Durum === true) {
            member.roles.set([ayar.roles.jailRole])
            if (jlog) jlog.send(embed.setDescription(`${member} Adlı kullanıcının aktif bir **[JAIL]** cezası varken sunucudan çıktığı için jail rolü verildi.`));
        }
    })
};