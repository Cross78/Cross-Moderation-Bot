const Discord = require("discord.js");
const ayar = require('../settings.js');
const tagData = require('../models/yasaklıtag.js')
module.exports = async member => {

    let data = await tagData.find({ guildID: member.guild.id }, async(err, data) => {
        if (!data || !data.length) return;
        if (data) {
            let taglar = data.map(s => s.Tag)
            if (taglar.some(tag => member.user.tag.toLowerCase().includes(tag))) {
                setTimeout(async() => {
                    await member.roles.set([ayar.roles.yasaklıTag])
                    await member.setNickname('Yasaklı | Tag')
                }, 2000)

            }
        }
    })
};