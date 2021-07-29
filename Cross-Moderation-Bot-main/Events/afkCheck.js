const ayar = require('../settings.js');
const { MessageEmbed } = require('discord.js');
let afkData = require('../models/afk.js');
const moment = require('moment');
require('moment-duration-format')
module.exports = async message => {

    if (!message.guild) return;
    let embed = new MessageEmbed().setColor('RANDOM').setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }));
    let data = await afkData.find({ guildID: message.guild.id, userID: message.member.id });
    let kontrol = data.some(s => s.Durum === true);

    let member = message.mentions.members.first();

    if (member) {
        let memberData = await afkData.find({ guildID: message.guild.id, userID: member.id });
        let memberKontrol = memberData.some(s => s.Durum === true);
        if (memberKontrol) {
            memberData.forEach(async(d, index) => {
                message.channel.send(embed.setDescription(`${member} Adlı kullanıcı **${d.Reason}** sebebiyle ${moment.duration(Date.now() - d.Tarih).format("D [Gün], H [Saat], m [Dakika], s [Saniye]")} önce AFK oldu!`));
            });
        }
    }

    if (kontrol) {
        message.channel.send(embed.setDescription(`${message.member} Artık AFK değilsin!`)).then(m => m.delete({ timeout: 7000 }));
        afkData.deleteOne({ userID: message.member.id }).catch(err => console.log('[AFK] Data temizleme hatası!'));
        if (message.member.manageable) message.member.setNickname(message.member.displayName.replace("[AFK] ", "")).catch(e => {});
    }
};