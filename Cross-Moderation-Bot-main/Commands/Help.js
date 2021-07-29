const Discord = require("discord.js")
const { Database, Logger } = require("../helpers/functions");
const ayar = require('../settings.js')
module.exports.run = async(client, message, args, embed) => {
        message.channel.send(embed.setDescription(`
Botta toplamda **${client.commands.size}** komut bulunmaktadır.\n
${client.commands.map(s => `▫️ \`${s.config.usage ? s.config.usage : `.${s.config.name}`}\``).join('\n')}
`))
};
exports.config = {
    name: "help",
    usage: `${ayar.bot.botPrefix}help`,
    guildOnly: true,
    aliases: ["yardım"],
    cooldown: 3000
};