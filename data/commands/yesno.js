const Discord = require('discord.js');
const uuidv1 = require('uuid/v1');

const reactionpoll = require('../utils/reactionpoll');
const perms = require('../utils/perms');
const footer = require('../utils/footer');

const emojiList = ['✅','❎'];

module.exports.run = (client, message, args, config, color) => {

        if (!perms.check(message.guild.id, message)) {
                return message.channel.send('You do not have permission to use that command!')
        }

        args.shift()
        var time = args.shift()
        var question = args.join(' ')
    
        var embed = new Discord.RichEmbed()
        .setColor(color)
        .setTitle(question)
        .setAuthor(message.member.user.tag, message.member.user.avatarURL)
        .setDescription("*Ends in "+time+" minutes*")
        .setFooter(footer.get())

        message.channel.send(embed)
        .then(message => reactionpoll.run(uuidv1(), time, ['Yes', 'No'], message, embed, emojiList, true))
    
}
