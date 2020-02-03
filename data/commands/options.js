const Discord = require('discord.js');
const reactionpoll = require('../utils/reactionpoll')

const emojiList = ['🇦','🇧','🇨','🇩','🇪','🇫','🇬','🇭','🇮','🇯','🇰','🇱','🇲','🇳','🇴','🇵','🇶','🇷','🇸','🇹','🇺','🇻','🇼','🇽','🇾','🇿'];

module.exports.run = (client, message, args, config, color) => {

        args.shift()
        var time = args.shift()
        
        var options = args.join(' ').split(';')
        var question = options.pop()

        if (options.length > 20) {
                options = options.slice(0, 20)
        }

        let optionText = ''
        let count = 0;
        for (var option in options) {
        optionText += '\n'+emojiList[count]+' - '+options[option]
        count += 1
        }

        var pollText = "*Ends in "+time+" minutes*"
    
        var embed = new Discord.RichEmbed()
        .setColor(color)
        .setTitle(question)
        .setAuthor(message.member.user.tag, message.member.user.avatarURL)
        .setDescription(pollText + optionText)

        message.channel.send(embed)
        .then(message => reactionpoll.run(time, options, message, embed, emojiList))
    
}
