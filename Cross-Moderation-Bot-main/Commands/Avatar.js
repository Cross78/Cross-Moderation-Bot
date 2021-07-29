const Discord = require("discord.js")
const { Database } = require("../helpers/functions");
const ayar = require('../settings.js')
module.exports.run = async(client, message, args) => {
    let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author);


    let pp = member.user.avatarURL({ dynamic: true }) || "Avatarın Yok"
    message.channel.send(pp).sil(7)
};
exports.config = {
    name: "avatar",
    usage: `${ayar.bot.botPrefix}avatar [@Cross/ID]`,
    guildOnly: true,
    aliases: ["av", "pp"],
    cooldown: 3000
};