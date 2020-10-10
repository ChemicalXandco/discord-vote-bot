const Discord = require('discord.js');

const perms = require('../utils/perms')

var getRoleId = function (role) {
    return role.slice(3, -1)
}

module.exports = {
    'args': "`add [@role]` - Add a role to the 'whitelist'.\n"+
            "`remove [@role]` - Remove a role from the 'whitelist'.\n"+
            "`list` - List all the roles currently on the 'whitelist'.",
    'desc': "Permissions are used to constrain who can start polls, if no roles are on the 'whitelist', then anyone can start a poll."
}

module.exports.run = (client, message, args, config, color) => {

    if (args[1] == 'list') {
        return message.channel.send(perms.resolvedRoleNames(message).toString())
    }

    if (!perms.check(message.guild.id, message)) {
        return message.channel.send('You do not have permission to use that command!')
    }

    if (args[1] == 'add') {
        if (perms.add(message.guild.id, getRoleId(args[2]))) {
            var result = 'Role whitelisted'
        } else {
            var result = 'Role was already whitelisted'
        }
    } else if (args[1] == 'remove') {
        if (perms.remove(message.guild.id, getRoleId(args[2]))) {
            var result = 'Role unwhitelisted'
        } else {
            var result = 'Role was not whitelisted'
        }
    } else {
        var result = 'No command given, use `permissions add @role`'
    }

    return message.channel.send(result)

}