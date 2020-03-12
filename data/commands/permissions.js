const Discord = require('discord.js');

const perms = require('../utils/perms')

var getRoleId = function (message, role) {
    console.warn(role.slice(3, -1))
    return role.slice(3, -1)
}

module.exports.run = (client, message, args, config, color) => {

    if (args[1] == 'add') {
        console.warn(args[2])
        if (perms.add(message.guild.id, getRoleId(message, args[2]))) {
            var result = 'Role added'
        } else {
            var result = 'Role was already whitelisted'
        }
    } else if (args[1] == 'remove') {
        if (perms.remove(message.guild.id, getRoleId(message, args[2]))) {
            var result = 'Role removed'
        } else {
            var result = 'Role was not whitelisted'
        }
    } else {
        var result = 'No command given, use `permissions add`'
    }
    
    var embed = new Discord.RichEmbed()
    .setColor(color)
    //.setTitle(client.user.username + ' Help')
    .setDescription(result)
    
    return message.channel.send(embed)
    
}