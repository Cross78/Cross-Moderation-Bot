const Discord = require("discord.js");
const ayar = require('../settings.js');
const { Kontrol } = require('../helpers/functions.js')
const rolData = require('../models/rollog.js')
module.exports = async(old, nev) => {
    let embed = new Discord.MessageEmbed().setColor('RANDOM').setTimestamp();
    let entry = await nev.guild.fetchAuditLogs({ type: 'GUILD_MEMBER_UPDATE' }).then(audit => audit.entries.first());
    let log = nev.guild.channels.cache.get(ayar.channels.rolLog);
    if (entry.executor.bot) return;

    if (nev.roles.cache.size > old.roles.cache.size) {
        nev.roles.cache.forEach(async(role) => {
            if (!old.roles.cache.has(role.id)) {
                if (log) log.send(embed.setDescription(`${entry.executor} adlı kullanıcı ${nev} adlı kullanıcıya ${role} rolünü verdi`))
                new rolData({
                    guildID: nev.guild.id,
                    userID: nev.id,
                    adminID: entry.executor.id,
                    Role: role.id,
                    Type: 'add',
                    Date: Date.now()
                }).save().catch(e => {});
            }
        });
    }


    if (old.roles.cache.size > nev.roles.cache.size) {
        old.roles.cache.forEach(async(role) => {
            if (!nev.roles.cache.has(role.id)) {
                if (log) log.send(embed.setDescription(`${entry.executor} adlı kullanıcı ${nev} adlı kullanıcıdan ${role} rolünü aldı`))
                new rolData({
                    guildID: nev.guild.id,
                    userID: nev.id,
                    adminID: entry.executor.id,
                    Role: role.id,
                    Type: 'remove',
                    Date: Date.now()
                }).save().catch(e => {});
            }
        });
    }

};