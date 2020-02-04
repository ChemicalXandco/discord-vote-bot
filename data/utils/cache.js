const Discord = require('discord.js');
const fs = require('fs');

var getCache = function () {
    file = fs.readFileSync('./cache.json')
    return JSON.parse(file)
}

var saveCache = function (cache) {
    let file = JSON.stringify(cache);
    fs.writeFileSync('./cache.json', file);
}

module.exports = {
    form: function (time, options, message, embed, emojiList) {
        console.warn("hello")
        let cache = {
            "time": time,
            "options": options,
            "message": {"id": message.id, "channelId": message.channel.id},
            "embed": embed,
            "emojiList": emojiList
        }
        console.warn("hello")
        console.warn(JSON.stringify(cache))
        return cache
    },

    save: function (uid, settings) {
        console.warn("hello")
        let cache = getCache()
        console.warn("bye")
        cache[uid] = settings
        saveCache(cache)
        console.warn("hello")
    },

    del: function (uid) {
        let cache = getCache()
        delete cache[uid]
        saveCache(cache)
    }
}
