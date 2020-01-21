const Discord = require('discord.js');

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
        .setTitle(client.user.username + ' Statistics')
        .setDescription('Number of guilds: ' + client.guilds.size + 
                        '\nPing: ' + client.ping +
                        '\nUptime: ' + uptime)
                        return message.channel.send(embed)
    
}
