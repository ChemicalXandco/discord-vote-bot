const Discord = require('discord.js');

module.exports.run = (client, message, args, config, color) => {
    
        var embed = new Discord.RichEmbed()
        .setColor(color)
        .setTitle(client.user.username + ' Help')
        .setDescription('`help` - Get documentation on ' + client.user.username + '\'s commands\n' + 
                        'stats - Get statistics of ' + client.user.username +
                        '`yesno [time(minutes)] [question]` - start a yes/no vote\n' +
                        '`options [time(minutes)] [option 1;option 2;...option 20;] [question]` - start a vote with up to 20 options')
                        return message.channel.send(embed)
    
}
