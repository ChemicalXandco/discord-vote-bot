const Discord = require('discord.js');
const fs = require('fs');

const permsFile = './perms.json'

var getPerms = function () {
    let file = fs.readFileSync(permsFile, 'utf8')
    return JSON.parse(file)
}

var savePerms = function (perms) {
    let file = JSON.stringify(perms);
    fs.writeFileSync(permsFile, file, 'utf8');
}

module.exports = {
    add: function (guildId, roleId) {
        let perms = getPerms()
        if (perms[guildId].indexOf(roleId) < 0) {
            perms[guildId].push(roleId)
            savePerms(perms)

            return true
        } else {
            return false
        }
    },

    remove: function (guildId, roleId) {
        let perms = getPerms()
        if (perms[guildId].indexOf(roleId) >= 0) {
            perms[guildId].splice(perms[guildId].indexOf(roleId), 1)
            savePerms(perms)

            return true
        } else {
            return false
        }
    },

    check: function (guildId, user) {
        let perms = getPerms()

        perms[guildId].forEach(function (item, index) {
            if (user.roles.has(item)) {
                return true
            }
        });

        return false
    }
}
