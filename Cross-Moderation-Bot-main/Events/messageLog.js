const ayar = require('../settings.js');
const { MessageEmbed } = require('discord.js');
module.exports = async message => {
        let client = message.client;
        let log = client.channels.cache.get(ayar.channels.messageLog);
        if (message.author.bot) return;
        let embed = new MessageEmbed().setColor('RANDOM').setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }));
        let entry = await message.guild.fetchAuditLogs({ type: 'MESSAGE_DELETE' }).then(audit => audit.entries.first())
        if (message.attachments.first()) {
            if (log) log.send(embed.setTitle('Bir Görsel Silindi!').setImage(message.attachments.first().proxyURL).setDescription(`${message.channel} Kanalında ${entry.executor} tarafından bir fotoğraf silindi!`))
        } else {

            if (log) log.send(embed.setDescription(`${message.channel} Kanalında ${entry.executor} tarafından bir mesaj silindi!
Mesaj İçeriği: ${message.content.length > 300 ? "300 Karakterden uzun.." : `**${message.content}**`}`).setTitle('Bir Mesaj Silindi!'))
    }
};