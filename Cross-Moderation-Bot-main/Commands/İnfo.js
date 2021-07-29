const Discord = require("discord.js")
const { Database, Logger } = require("../helpers/functions");
const ayar = require('../settings.js')
const moment = require('moment')
require('moment-duration-format');
moment.locale('tr');
module.exports.run = async(client, message, args, embed) => {
        let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author);
        let olusturma = moment(member.user.createdTimestamp).format('LLL');
        let katılma = moment(member.joinedTimestamp).format('LLL');
        let gecen = moment.duration(Date.now() - member.user.createdTimestamp).format("Y [Yıl], M [Ay], D [Gün]");
        let durum = member.user.presence.status.replace("dnd", "🔴").replace("idle", "🟡").replace("online", "🟢").replace("offline", "⚫")
        let s = member.presence.activities[0];
        let aktivite;
        if (s) {
            aktivite = `${s.name ? s.name : s.state ? s.state : ""} ${s.type.replace('PLAYING','Oynuyor').replace('LISTENING','Dinliyor').replace('WATCHING','İzliyor').replace('STREAMING','Yayında')}`
        } else {
            aktivite = "Yok"
        }
        message.channel.send(embed.setDescription(`
**__Kullanıcı Bilgisi__**
\`ID:\` ${member.id}
\`Profil:\` ${member}
\`Durum:\` ${durum} ${aktivite}
\`Oluşturulma tarihi:\` ${olusturma} (${gecen})

**__Üyelik Bilgisi__**
\`Takma Adı:\` ${member.displayName ? member.displayName : member.user.username}
\`Katılma Tarihi:\` ${katılma}
\`Katılım Sırası:\` ${(message.guild.members.cache.filter(a => a.joinedTimestamp <= message.member.joinedTimestamp).size).toLocaleString()}/${(message.guild.memberCount).toLocaleString()}
\`Rolleri:\` ${member.roles.cache.size > 5 ? "Listelenemedi!" : `${member.roles.cache.filter(s => s.name != "@everyone").map(s => `${s}`).join(',')} (${member.roles.cache.size - 1})`}
`))
};
exports.config = {
    name: "info",
    usage: `${ayar.bot.botPrefix}info [@Cross/ID]`,
    guildOnly: true,
    aliases: ["kullanıcı-bilgi","kb"],
    cooldown: 3000
};