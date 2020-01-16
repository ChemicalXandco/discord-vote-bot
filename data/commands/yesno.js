const Discord = require('discord.js');
const reactionpoll = require('../utils/reactionpoll')

const emojiList = ['✅','❎'];

module.exports.run = (client, message, args, config, color) => {

        args.shift()
        var time = args.shift()
        var question = args.join(' ')
    
        var embed = new Discord.RichEmbed()
        .setColor(color)
        .setTitle(question)
        .setAuthor(message.member.user.tag, message.member.user.avatarURL)
        .setDescription("*Ends in "+time+" minutes*")

        return reactionpoll.run(time, ['Yes', 'No'], message, embed, emojiList)
    
}
module.exports.name = 'yesno'
