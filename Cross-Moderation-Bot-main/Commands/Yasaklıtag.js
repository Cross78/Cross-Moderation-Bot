const Discord = require("discord.js")
const { Database, Logger } = require("../helpers/functions");
const ayar = require('../settings.js')
const moment = require('moment')
require('moment-duration-format')
const tagData = require('../models/yasaklıtag.js')
module.exports.run = async(client, message, args, embed) => {
        if (!message.member.hasPermission(8)) return message.channel.send(embed.setDescription(`${message.author}, Bu komutu kullanmak için yeterli yetkiye sahip değilsin!`)).sil(7);
        let cmd = args[0]
        let data = await tagData.find({ guildID: message.guild.id })
        if (cmd === 'ekle') {
            let hedef = args[1]
            let reason = args.slice(2).join(' ')
            if (!hedef || !reason) return message.channel.send(embed.setDescription(`Geçerli bir tag ve sebep belirtmelisin.`))
            if (data && data.some(s => s.Tag === hedef)) return message.channel.send(embed.setDescription(`${message.member}, Bu tag zaten yasaklı listede mevcut.`))
            let x = new tagData({
                guildID: message.guild.id,
                adminID: message.member.id,
                Tag: hedef,
                Reason: reason,
                Date: Date.now()
            })
            x.save().then(s => {
                message.channel.send(embed.setDescription(`\`${hedef}\` tagı başarılı bir şekilde yasaklı listeye eklendi!`))
                message.guild.members.cache.filter(s => s.user.tag.toLowerCase().includes(hedef)).forEach(async m => {
                    await m.roles.set([ayar.roles.yasaklıTag]).catch(e => {});
                    await m.setNickname('Yasaklı | Tag').catch(e => {})
                })
            })
        } else if (cmd === 'liste') {
            if (!data) return message.channel.send(embed.setDescription(`Sunucuya ait yasaklı tag verisi bulunamadı!`))
            let map = data.length > 0 ? data.map((value, index) => `\`${value.Tag}\` - ${message.guild.members.cache.get(value.adminID)} - **${value.Reason}** - **${moment(value.Date).locale('tr').format('LLL')}**`).join('\n') : "Sunucuya ait veri bulunamadı."
            message.channel.send(embed.setDescription(`
${map}
`))
        } else if (cmd === 'sil') {
            if (!data && !data.length) return message.channel.send(embed.setDescription(`Sunucuya ait yasaklı tag verisi bulunmadığından silme işlemi yapılamaz!`))
            let hedef = args[1]
            if (!hedef) return;
            if (!data.some(s => s.Tag === hedef)) return message.channel.send(embed.setDescription(`Bu tag yasaklı listede zaten bulunmamakta!`))

            await tagData.deleteOne({ Tag: hedef }).then(s => {
                message.channel.send(embed.setDescription(`\`${hedef}\` tagı yasaklı listeden kaldırıldı!`))
                message.guild.members.cache.filter(s => s.user.tag.toLowerCase().includes(hedef)).forEach(async m => {
                    await m.roles.set(ayar.roles.unregisterRoles).catch(e => {});
                    await m.setNickname('• İsim | Yaş')
                })
            }).catch(err => console.error('Silinemedi!'))

        } else if (cmd === 'bilgi') {
            let hedef = args[1]
            if (!hedef) return;
            if (!data.map(s => s.Tag).includes(hedef)) return message.channel.send(embed.setDescription(`Belirttiğiniz tag yasaklı listede bulunmamakta!`))
            message.channel.send(embed.setDescription(`
**${hedef}** tagı ile ilgili bilgiler;

Tagdaki üye sayısı: **${message.guild.members.cache.filter(s => s.user.tag.toLowerCase().includes(hedef)).size}**
Tagı ekleyen: ${data.filter(s => s.Tag === hedef).map(s => `${message.guild.members.cache.get(s.adminID)}`)}
Eklenme sebebi: **${data.filter(s => s.Tag === hedef).map(s => `**${s.Reason}**`)}**
Tag eklenme tarihi: **${data.filter(s => s.Tag === hedef).map(s => `${moment(s.Date).locale('tr').format('LLL')}`)}**
`))
} else {
   
    message.channel.send(embed.setDescription(`
    **Yasaklı tag işlemleri;**

   ▫️ \`.yasaklıtag ekle [TAG]\` **Belirttiğiniz tagı yasaklı listeye ekler.**
   ▫️ \`.yasaklıtag sil [TAG]\` **Belirttiğiniz tagı yasaklı listeden siler.**
   ▫️ \`.yasaklıtag liste\` **Sunucunun yasaklı taglarını listeler.**
   ▫️ \`.yasaklıtag bilgi [TAG]\` **Belirttiğiniz yasaklı tag ile ilgili bilgileri listeler.**
    `)).sil(10)
}  

};
exports.config = {
    name: "yasaklıtag",
    usage: `${ayar.bot.botPrefix}yasaklıtag [ekle/sil/liste/bilgi]`,
    guildOnly: true,
    aliases: ["yasaklı-tag"],
    cooldown: 3000
};
