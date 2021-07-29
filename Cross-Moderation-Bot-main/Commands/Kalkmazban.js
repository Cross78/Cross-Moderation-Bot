const Discord = require("discord.js")
const { Database, Logger } = require("../helpers/functions");
const ayar = require('../settings.js')
const banData = require('../models/kalkmazban.js')

module.exports.run = async(client, message, args, embed) => {
    if (!message.member.hasPermission(8)) return message.channel.send(embed.setDescription(`${message.author}, Bu komutu kullanmak için yeterli yetkiye sahip değilsin!`)).sil(7);
    let data = await banData.findOne({ guildID: message.guild.id });

    if (args[0] == "aç") {
        let member;
        if (args[1]) member = await client.users.fetch(args[1]);
        if (!member) return message.channel.send(embed.setDescription(`${message.member}, Geçerli bir üye belirtmelisin.`)).sil(7);
        if (!data || !data.Members.includes(member.id)) return message.channel.send(embed.setDescription(`Bu kullanıcının banı bulunmamakta.`)).sil(7);
        await banData.findOneAndUpdate({ guildID: message.guild.id }, { $pull: { Members: member.id } }).then(m => {
            message.guild.members.unban(member.id, { reason: "Kalkmaz ban affı" }).catch(e => {});
            message.channel.send(embed.setDescription(`${member.toString()} Adlı kullanıcının yasağı kaldırıldı`))
        }).catch(e => {})
    } else {
        let member;
        if (args[0]) member = await client.users.fetch(args[0]);
        if (!member) return message.channel.send(embed.setDescription(`${message.member}, Geçerli bir üye belirtmelisin.`)).sil(7);
        let sebep = args.slice(1).join(' ')
        if (!sebep) return message.channel.send(embed.setDescription(`${message.member}, Geçerli bir sebep belirtmelisin.`)).sil(7);
        message.guild.members.ban(member.id, { reason: sebep }).catch(e => {});
        if (!data) {
            new banData({
                guildID: message.guild.id,
                Members: member.id
            }).save().catch(e => {});
            message.channel.send(embed.setDescription(`${member.toString()} Adlı kullanıcı sunucudan **${sebep}** sebebiyle kalıcı olarak yasaklandı!`))

        } else {
            await banData.findOneAndUpdate({ guildID: message.guild.id }, { $push: { Members: member.id } }).catch(e => {});
            message.channel.send(embed.setDescription(`${member.toString()} Adlı kullanıcı sunucudan **${sebep}** sebebiyle kalıcı olarak yasaklandı!`))
        }
    }

};
exports.config = {
    name: "kalkmazban",
    usage: `${ayar.bot.botPrefix}kalkmazban [ID] [Reason]`,
    guildOnly: true,
    aliases: [],
    cooldown: 3000
};