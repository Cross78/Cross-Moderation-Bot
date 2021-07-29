const reqEvent = event => require(`../Events/${event}`);
module.exports = client => {
    client.on('ready', () => reqEvent('ready')(client));
    client.on('message', reqEvent('message'));
    client.on('message', reqEvent('afkCheck'));
    client.on('guildMemberAdd', reqEvent('cezaKontrol'));
    client.on('message', reqEvent('Snipe'));
    client.on('guildMemberAdd', reqEvent('bannedTagsCheck2'));
    client.on('guildMemberAdd', reqEvent('banCheck'));
    client.on('guildMemberUpdate', reqEvent('rolLog'));
    client.on('message', reqEvent('İltifat'));
    client.on('voiceStateUpdate', reqEvent('VoiceLog'));
    client.on('messageDelete', reqEvent('messageLog'));
    client.on('messageUpdate', reqEvent('messageUpdateLog'));
};