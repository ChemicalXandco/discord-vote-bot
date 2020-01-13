const Discord = require('discord.js');
const reactionpoll = require('../src/reactionpoll')

const emojiList = ['✅','❎'];

module.exports.run = (client, message, args, config, color) => {
    
        var embed = new Discord.RichEmbed()
        .setColor(color)
        .setTitle('Yes/no poll')
        .setAuthor(message.member.user.tag, message.member.user.avatarURL)
        .setDescription(args[2])

        return reactionpoll.run(args[1], ['Yes', 'No'], message, embed, emojiList)
    
}
module.exports.name = 'yesno'
