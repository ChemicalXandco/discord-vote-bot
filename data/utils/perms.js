const Discord = require('discord.js');
const fs = require('fs');

const permsFile = './perms.json'

var getPerms = function (guildId) {
    let file = fs.readFileSync(permsFile, 'utf8')
    let perms = JSON.parse(file)

    if (!(guildId in perms)) {
        perms[guildId] = []
    }

    return perms
}

var savePerms = function (perms) {
    let file = JSON.stringify(perms);
    fs.writeFileSync(permsFile, file, 'utf8');
}

var guildExists = function (perms, guildId) {
    if (!(guildId in perms)) {
        return perms[guildId] = []
    } else {
        return perms
    }
}

module.exports = {
    add: function (guildId, roleId) {
        let perms = getPerms(guildId)
        if (perms[guildId].indexOf(roleId) < 0) {
            perms[guildId].push(roleId)
            savePerms(perms)

            return true
        } else {
            return false
        }
    },

    remove: function (guildId, roleId) {
        let perms = getPerms(guildId)
        if (perms[guildId].indexOf(roleId) >= 0) {
            perms[guildId].splice(perms[guildId].indexOf(roleId), 1)
            savePerms(perms)

            return true
        } else {
            return false
        }
    },

    resolvedRoleNames: function (message) {
        let perms = getPerms(message.guild.id)
        let roleNames = []

        perms[message.guild.id].forEach(function (item, index) {
            try {
                roleNames.push('@'+message.guild.roles.get(item).name)
            } catch(err) {
                roleNames.push('@[Role removed]('+item+')')
            }
        });

        if (roleNames.length < 1) {
            roleNames.push('None')
        }

        return roleNames
    },

    check: function (guildId, message) {
        let perms = getPerms(guildId)
        let guildMember = message.guild.member(message.author)

        if (guildMember.hasPermission('ADMINISTRATOR')) {
            return true
        }

        if (perms[guildId] == '') {
            return true
        }

        var hasRole = false
        perms[guildId].forEach(function (item, index) {
            if (guildMember.roles.has(item)) {
                hasRole = true
            }
        });
        if (hasRole) {
            return true
        } else {
            return false
        }
    }
}
