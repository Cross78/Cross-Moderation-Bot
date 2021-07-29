const ayar = require('../settings.js');
const { MessageEmbed } = require('discord.js');
const durkardesim = new Map()
module.exports = message => {
    let client = message.client;
    if (message.author.bot) return;
    if (!message.content.startsWith(ayar.bot.botPrefix)) return;
    let command = message.content.split(' ')[0].slice(ayar.bot.botPrefix.length);
    let params = message.content.split(' ').slice(1);
    let embed = new MessageEmbed().setColor('RANDOM').setFooter('Cross was here!').setTimestamp()
    let cmd;
    if (client.commands.has(command)) {
        cmd = client.commands.get(command);
    } else if (client.aliases.has(command)) {
        cmd = client.commands.get(client.aliases.get(command));
    };
    if (cmd) {
        if (!message.guild) {
            if (cmd.ayar.guildOnly === true) {
                return;
            };
        };
        if (cmd.config.permLevel) {
            if (cmd.config.permLevel === "BOT_OWNER") {
                if (!ayar.bot.botOwner.includes(message.author.id)) {
                    message.channel.send(`Bu komutu kullanabilmek için \`${cmd.config.permLevel}\` yetkisine sahip olmalısın.`).then(msg => msg.delete({ timeout: 3000 }));
                    return;
                }
            }
            if (!message.member.hasPermission(cmd.config.permLevel)) {
                message.channel.send(`Bu komutu kullanabilmek için \`${cmd.config.permLevel}\` yetkisine sahip olmalısın.`).then(msg => msg.delete({ timeout: 3000 }));
                return;
            };
        };
        if (ayar.bot.botOwner.some(id => message.author.id !== id)) {
            if (durkardesim.has(message.author.id) && durkardesim.get(message.author.id).komut == cmd.config.name && durkardesim.get(message.author.id).zaman > Date.now()) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, \`${cmd.config.name}\` komutu kullanabilmek için **${Math.floor((durkardesim.get(message.author.id).zaman - Date.now()) / 1000)}** saniye beklemelisin.`).setColor('RANDOM')).then(m => m.delete({ timeout: 7000 }) && message.delete({ timeout: 7000 }));
            durkardesim.set(message.author.id, { komut: cmd.config.name, zaman: Date.now() + cmd.config.cooldown });
        }
        cmd.run(client, message, params, embed);
    };
};