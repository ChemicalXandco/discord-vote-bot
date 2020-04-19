const Discord = require('discord.js');

module.exports.run = (client, message, args, config, color) => {
    
        var embed = new Discord.RichEmbed()
        .setColor(color)
        .setTitle(client.user.username + ' Help')
        .setDescription('`help` - Get documentation on ' + client.user.username + '\'s commands\n' + 
                        '`info` - Get information about ' + client.user.username +
                        '\n`random [option 1;option 2...]` - pick a random option\n' +
                        '`yesno [time(minutes)] [question]` - start a yes/no vote\n' +
                        '`options [time(minutes)] [option 1;option 2;...option 20;] [question]` - start a vote with up to 20 options\n\n' +
                        '`permissions add [@role]` - Add a role to the whitelist\n' +
                        '`            remove [@role]` - Remove a role from the whitelist\n' +
                        '`            list` - List all the roles currently on the whitelist\n' +
                        'The whitelist is used to constrain who can start polls, if no roles are on the whitelist, then everyone can start a poll\n' +
                        '\nYou can get help on the [support server](https://discord.gg/wbt5aYS)')
                        return message.channel.send(embed)
    
}
