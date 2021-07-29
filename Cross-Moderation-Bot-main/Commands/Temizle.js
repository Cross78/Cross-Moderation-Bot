const Discord = require("discord.js")
const { Database, Logger } = require("../helpers/functions");
const ayar = require('../settings.js')
module.exports.run = async(client, message, args, embed) => {
    if (!message.member.hasPermission(8)) return message.channel.send(embed.setDescription(`${message.author}, Bu komutu kullanmak için yeterli yetkiye sahip değilsin!`)).sil(7);
    if (!args[0] || (args[0] && isNaN(args[0])) || Number(args[0]) < 1 || Number(args[0]) > 100) return message.channel.send(embed.setDescription(`${message.author}, Eksik arguman kullandınız, **${ayar.bot.botPrefix}sil 1/100**`)).then(x => x.delete({ timeout: 5000 }));

    await message.delete().catch();

    message.channel.bulkDelete(Number(args[0])).then(msjlar => message.channel.send(embed.setDescription(`**${msjlar.size}** Adet mesaj başarıyla temizlendi!`))).sil(7)


};
exports.config = {
    name: "sil",
    usage: `${ayar.bot.botPrefix}sil [Number]`,
    guildOnly: true,
    aliases: ["temizle"],
    cooldown: 3000
};