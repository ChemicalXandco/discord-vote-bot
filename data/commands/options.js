const Discord = require('discord.js');
const reactionpoll = require('../src/reactionpoll')

const emojiList = ['🇦','🇧','🇨','🇩','🇪','🇫','🇬','🇭','🇮','🇯','🇰','🇱','🇲','🇳','🇴','🇵','🇶','🇷','🇸','🇹','🇺','🇻','🇼','🇽','🇾','🇿'];

module.exports.run = (client, message, args, config, color) => {

        var options = args.slice(2, -1).join(' ').split(';')

        if (options.length > 20) {
                options = options.slice(0, 20)
        }

        let optionText = ''
        let count = 0;
        for (var option in options) {
        optionText += '\n'+emojiList[count]+' - '+options[option]
        count += 1
        }
    
        var embed = new Discord.RichEmbed()
        .setColor(color)
        .setTitle('Option poll')
        .setAuthor(message.member.user.tag, message.member.user.avatarURL)
        .setDescription(optionText)

        return reactionpoll.run(args[1], options, message, embed, emojiList)
    
}
module.exports.name = 'options'
