const Discord = require("discord.js")
const { Database, Logger } = require("../helpers/functions");
const ayar = require('../settings.js')
const penalData = require('../models/penal.js')
let limit = require('../models/limit.js')
module.exports.run = async(client, message, args, embed) => {
        if (ayar.roles.banStaff.some(r => !message.member.roles.cache.has(r)) && !message.member.hasPermission(8)) return message.channel.send(embed.setDescription(`${message.author}, Bu komutu kullanmak için yeterli yetkiye sahip değilsin!`)).sil(7);
        let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
        let sebep = args.slice(1).join(' ')
        if (args[0] == "bilgi" || args[0] == "info") {
            if (!args[1] || isNaN(args[1])) return message.channel.send(embed.setDescription(`${message.member}, Lütfen bir kullanıcı ID giriniz.`)).sil(7);
            let banlar = await message.guild.fetchBans()
            return message.guild.fetchBan(args.slice(1).join(' ')).then(({ user, reason }) => message.channel.send(embed.setDescription(`**Banlanan Üye:** ${user.tag} (${user.id})\n**Ban Sebebi:** ${reason ? reason : "Belirtilmemiş!"}`))).catch(err => message.channel.send(embed.setDescription("Belirtilen ID numarasına sahip bir ban bulunamadı!")).sil(7));
        }

        if (args[0] && args[0].includes('list')) {
            try {
                message.guild.fetchBans().then(bans => {
                            message.channel.send(`# Sunucudan yasaklanmış kişiler; ⛔\n\n${bans.map(c => `${c.user.id} | ${c.user.tag}`).join("\n")}\n\n# Toplam "${bans.size}" adet yasaklanmış kullanıcı bulunuyor.`, {code: 'xl', split: true});
      });
     }  catch (err) { message.channel.send(`Yasaklı kullanıcı bulunmamakta!`).then(x => x.delete({timeout: 5000}));; }
    return;
  };
    if (!member || !sebep) return message.channel.send(embed.setDescription(`${message.member}, Hatalı kullanım. Örnek: **${ayar.bot.botPrefix}ban @Cross/ID [Reason]**`)).sil(7)

    let memberData = await penalData.find({ guildID: message.guild.id, userID: member.id })
    let limitData = await limit.findOne({ guildID: message.guild.id, userID: message.author.id });
    if (limitData && limitData.Count >= ayar.guild.banLimit) return message.channel.send(embed.setDescription(`${message.member}, Bu günlük ban limit sınırına ulaştın.`)).sil(7)
    let count = await penalData.countDocuments().exec();
    let cezaID = count ? count += 1 : 1;
    if (member.id == message.author.id) return message.react(ayar.emojis.no)
    if (member.id == client.user.id) return message.react(ayar.emojis.no);
    if (member.user.bot) return message.react(ayar.emojis.no);
    if (member.permissions.has(8)) return message.channel.send(embed.setDescription(`${message.member}, Yönetici bir kullanıcıya karışamam.`)).sil(7)
    if (member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(embed.setDescription(`${message.member}, Bu kullanıcı sizden üst/aynı pozisyonda.`)).sil(7)



    if (!limitData) {
        new limit({ guildID: message.guild.id, userID: message.author.id, Count: 1 }).save();
    } else {
        limitData.Count++
            limitData.save().catch(e => {});
    }
    await Database.ban(message.guild, member, message.author, cezaID, "BAN", true, sebep, Date.now(), 15)

    setTimeout(async() => {
   await Logger.ban(ayar.channels.banLog, message.channel, member, message.author, sebep, cezaID)
    await member.ban({ reason: sebep }).catch(e => { console.log(e) });     
    }, 1500)
};
exports.config = {
    name: "ban",
    usage: `${ayar.bot.botPrefix}ban [@Cross/ID] [reason]`,
    guildOnly: true,
    aliases: [],
    cooldown: 3000
};