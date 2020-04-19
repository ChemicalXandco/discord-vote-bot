const Discord = require('discord.js');

const footer = require('../utils/footer');

function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
}

module.exports = {
        'args': '`[options]` - The options that can be selected, seperated by semi colons, e.g. eggs;ham;peanut butter',
        'desc': 'Picks a random item from a list.'
}

module.exports.run = (client, message, args, config, color) => {

        args.shift()
        var options = args.join(' ').split(';')

        if (options.length < 2) {
                return message.channel.send('You must have at least 2 semi colon seperated options in this command.')
        }

        var embed = new Discord.RichEmbed()
        .setColor(color)
        .setTitle('Random')
        .setAuthor(message.member.user.tag, message.member.user.avatarURL)
        .addField('Options', options.join(', '))
        .addField('Result', options[getRandomInt(options.length)])
        .setFooter(footer.get())

        message.channel.send(embed)
    
}
