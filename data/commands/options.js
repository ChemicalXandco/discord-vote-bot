const Discord = require('discord.js');
const uuidv1 = require('uuid/v1');

const reactionpoll = require('../utils/reactionpoll');
const perms = require('../utils/perms');
const footer = require('../utils/footer');

const emojiList = ['🇦','🇧','🇨','🇩','🇪','🇫','🇬','🇭','🇮','🇯','🇰','🇱','🇲','🇳','🇴','🇵','🇶','🇷','🇸','🇹','🇺','🇻','🇼','🇽','🇾','🇿'];

module.exports.run = (client, message, args, config, color) => {

        if (!perms.check(message.guild.id, message)) {
                return message.channel.send('You do not have permission to use that command!')
        }

        args.shift()
        var time = args.shift()
        
        var options = args.join(' ').split(';')
        var question = options.pop()

        if (options.length < 2) {
                return message.channel.send('You must have at least 2 semi colon seperated options in this command. (do not forget the semi colon at the end of the last option)')
        }

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
        .setFooter(footer.get())

        message.channel.send(embed)
        .then(message => reactionpoll.run(uuidv1(), time, options, message, embed, emojiList, true))
    
}
