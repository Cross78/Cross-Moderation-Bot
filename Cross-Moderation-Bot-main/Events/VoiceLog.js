const Discord = require("discord.js");
const ayar = require('../settings.js');
module.exports = async(oldState, newState) => {
    let member = oldState.guild.members.cache.get(oldState.id);
    if (!member) return;
    let log = oldState.guild.channels.cache.get(ayar.channels.voiceLog);
    let embed = new Discord.MessageEmbed().setColor('RANDOM').setTimestamp().setAuthor(member.user.tag, member.user.avatarURL({ dynamic: true }));
    if (member.user.bot) return;
    if (!oldState.channel && newState.channel) return log.send(embed.setDescription(`${member} - (\`${member.id}\`) Adlı kullanıcı ${newState.channel} adlı kanala giriş yaptı!`));

    if (oldState.channel && !newState.channel) return log.send(embed.setDescription(`${member} - (\`${member.id}\`) Adlı kullanıcı ${oldState.channel} adlı kanaldan çıkış yaptı!`));

    if (oldState.selfMute && !newState.selfMute) return log.send(embed.setDescription(`${member} - (\`${member.id}\`) Adlı kullanıcı ${newState.channel} adlı kanalda mikrofonunu açtı!`));

    if (!oldState.selfMute && newState.selfMute) return log.send(embed.setDescription(`${member} - (\`${member.id}\`) Adlı kullanıcı ${newState.channel} adlı kanalda mikrofonunu kapattı!`));

    if (oldState.selfDeaf && !newState.selfDeaf) return log.send(embed.setDescription(`${member} - (\`${member.id}\`) Adlı kullanıcı ${newState.channel} adlı kanalda kulaklığını açtı!`));

    if (!oldState.selfDeaf && newState.selfDeaf) return log.send(embed.setDescription(`${member} - (\`${member.id}\`) Adlı kullanıcı ${newState.channel} adlı kanalda kulaklığını kapattı!`));

    if (oldState.serverMute && !newState.serverMute) return log.send(embed.setDescription(`${member} - (\`${member.id}\`) Adlı kullanıcı ${newState.channel} adlı kanalda susturulması kaldırıldı!`));

    if (!oldState.serverMute && newState.serverMute) return log.send(embed.setDescription(`${member} - (\`${member.id}\`) Adlı kullanıcı ${newState.channel} adlı kanalda susturuldu!`));

    if (!oldState.serverDeaf && newState.serverDeaf) return log.send(embed.setDescription(`${member} - (\`${member.id}\`) Adlı kullanıcı ${newState.channel} adlı kanalda sağırlaştırıldı!`));

    if (oldState.serverDeaf && !newState.serverDeaf) return log.send(embed.setDescription(`${member} - (\`${member.id}\`) Adlı kullanıcı ${newState.channel} adlı kanalda sağırlaştırması kaldırıldı!`));

    if (!oldState.streaming && newState.streaming) return log.send(embed.setDescription(`${member} - (\`${member.id}\`) Adlı kullanıcı ${newState.channel} adlı kanalda yayın açtı!`));

    if (oldState.streaming && !newState.streaming) return log.send(embed.setDescription(`${member} - (\`${member.id}\`) Adlı kullanıcı ${newState.channel} adlı kanalda yayını kapattı!`));

    if (!oldState.selfVideo && newState.selfVideo) return log.send(embed.setDescription(`${member} - (\`${member.id}\`) Adlı kullanıcı ${newState.channel} adlı kanalda kamera açtı!`));

    if (oldState.selfVideo && !newState.selfVideo) return log.send(embed.setDescription(`${member} - (\`${member.id}\`) Adlı kullanıcı ${newState.channel} adlı kanalda kamerayı kapattı!`));
};