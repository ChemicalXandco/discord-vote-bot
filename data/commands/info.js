const Discord = require('discord.js');

const cache = require('../utils/cache');

module.exports = {
        'args': 'None',
        'desc': 'Statistics, information and links related to this bot.'
}

module.exports.run = (client, message, args, config, color) => {

        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;
        let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
    
        var embed = new Discord.RichEmbed()
        .setColor(color)
        .setTitle(client.user.username + ' Information')
        .setDescription(client.user.username + ' is the all-in-one solution for all your voting needs.')
        .addField('Statistics',
                'Version: ' + config.version +
                '\nNumber of guilds: ' + client.guilds.size + 
                '\nNumber of commands: ' + client.commands.size +
                '\nNumber of polls currently happening: ' + cache.count() +
                '\nPing: ' + client.ping +
                '\nUptime: ' + uptime,
                true)
        .addField('Privacy',
                client.user.username + ' stores data temporarily in case the bot restarts so polls can be resumed.',
                true)
        .addField('Links',
                'Source: https://github.com/ChemicalXandco/discord-vote-bot\n' +
                'Discord bots listing (Please vote if you find this bot useful): https://top.gg/bot/541310790658031626\n' +
                'Support server: https://discord.gg/wbt5aYS')
                        
        return message.channel.send(embed)
    
}
