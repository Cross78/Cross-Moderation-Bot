const Discord = require("discord.js")
const { Database, Logger } = require("../helpers/functions");
const ayar = require('../settings.js')
module.exports.run = async(client, message, args, embed) => {
    if (!message.member.hasPermission(8)) return message.channel.send(embed.setDescription(`${message.author}, Bu komutu kullanmak için yeterli yetkiye sahip değilsin!`)).sil(7);
    let cmd = args[0];
    let role = message.guild.roles.cache.get(ayar.roles.enAltYt)
    let rol = message.guild.members.cache.filter(s => s.roles.highest.position >= role.position)
    if (cmd == "say") {
        let top = rol.size
        let online = rol.filter(s => s.presence.status != 'offline').size;
        let aktifunsesyt = rol.filter(s => s.presence.status != 'offline' && !s.voice.channel).size
        let ses = rol.filter(s => s.voice.channel).size;
        message.channel.send(embed.setDescription(`
> Sunucumuzda toplam **${top}** yetkili bulunmakta
> Sunucumuzda toplam **${online}** aktif yetkili bulunmakta.
> Sunucumuzda toplam **${aktifunsesyt}** aktif olup seste olmayan yetkili bulunmakta.
> Seste toplam **${ses}** yetkili bulunmakta.
`)).sil(7);
    } else if (cmd == "dm") {
        let aktifunsesyt = rol.filter(s => s.presence.status != 'offline' && !s.voice.channel)
        message.channel.send(embed.setDescription(`${aktifunsesyt.size} Yetkiliye ses çağrısı yapılıyor.`).setColor('RANDOM')).then(async(msg) => {
            aktifunsesyt.array().forEach(async(cross, index) => {
                setTimeout(async() => {
                    msg.edit(embed.setDescription(`${cross} Yetkilisine özelden mesaj atıldı.`))
                    cross.send(`Aktifsin fakat seste değilsin lütfen ses kanalına gir.\n**${message.guild.name}**`).catch(err => message.channel.send(`${cross} Aktifsin fakat seste değilsin lütfen ses kanalına gir.`) && msg.edit(embed.setDescription(`${cross} kullanıcısına özelden mesaj gönderilemediği için kanala etiketlendi.`)))
                }, index * 1500)
            })

        })
    } else {
        message.channel.send(embed.setDescription(`
**YETKİLİ KOMUTLARI**

> **${ayar.bot.botPrefix}yetkili say** Sunucudaki yetkili istatistiklerini gösterir.
> 
> **${ayar.bot.botPrefix}yetkili dm** Sunucudaki yetkililere ses çağrısı yapar.
`)).sil(7)
    }
};
exports.config = {
    name: "yetkili",
    usage: `${ayar.bot.botPrefix}yetkili [say/dm]`,
    guildOnly: true,
    aliases: [],
    cooldown: 3000
};
