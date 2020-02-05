const Discord = require('discord.js');
const fs = require('fs');

const cacheFile = './cache.json'

var getCache = function () {
    let file = fs.readFileSync(cacheFile)
    return JSON.parse(file)
}

var saveCache = function (cache) {
    let file = JSON.stringify(cache);
    fs.writeFileSync(cacheFile, file);
}

module.exports = {
    form: function (time, options, message, embed, emojiList) {
        let cache = {
            "time": time,
            "options": options,
            "message": {"id": message.id, "channelId": message.channel.id},
            "embed": embed,
            "emojiList": emojiList
        }
        
        return cache
    },

    save: function (uid, settings) {
        let cache = getCache()
        cache[uid] = settings
        saveCache(cache)
    },

    del: function (uid) {
        let cache = getCache()
        delete cache[uid]
        saveCache(cache)
    }
}
