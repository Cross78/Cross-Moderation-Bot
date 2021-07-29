const ayar = require('../settings.js');
const { MessageEmbed } = require('discord.js');
module.exports = async(old, nev) => {
        let client = old.client;
        let log = client.channels.cache.get(ayar.channels.messageLog);
        if (old.author.bot) return;
        let embed = new MessageEmbed().setColor('RANDOM').setAuthor(old.author.tag, old.author.avatarURL({ dynamic: true }));
        let entry = await old.guild.fetchAuditLogs({ type: 'MESSAGE_DELETE' }).then(audit => audit.entries.first())


        if (log) log.send(embed.setDescription(`${nev.channel} Kanalında ${entry.executor} tarafından bir mesaj düzenlendi!
Mesaj İçeriği: ${nev.content.length > 300 ? "300 Karakterden uzun.." : `**${nev.content}**`}`).setTitle('Bir Mesaj Düzenlendi!'))
    
};