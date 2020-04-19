const Discord = require('discord.js');

const cache = require('./cache')

const lastChar = (str) => str.split('').reverse().join(',').replace(',', '')[str.length === str.length + 1 ? 1 : 0];

function sleep(ms){
    return new Promise(resolve=>{
      setTimeout(resolve,ms)
    })
  }

module.exports = {
    run: async function (uid, time, options, message, embed, emojiList, isNew) {
        let reactionArray = [];
        let count = 0;

        if (isNew) {
            for (var option in options) {
                reactionArray[count] = await message.react(emojiList[count]).catch((err) => message.edit(embed.addField('Error', err)));
                count += 1
            }

            cache.save(uid, cache.form(time, options, message, embed, emojiList))
        } else {
            embed = new Discord.RichEmbed(embed);
        }

        if (isNaN(time)) {
            message.edit(embed.addField('Error', 'time "' + time + '" is not a number'));
            cache.del(uid)
        } else {
            var timeElapsed = new Date()-message.createdAt
            // Re-fetch the message and get reaction counts
            message.channel.fetchMessage(message.id)
            .then(async function (message) {
                await sleep((time*60000)-timeElapsed)
                var reactionCountsArray = [];                               
                for (var i = 0; i < options.length; i++) {
                    try {
                        reactionCountsArray[i] = await message.reactions.get(emojiList[i]).count-1;
                    } catch(err) { message.edit(embed.addField('Error', err)); }
                }

                // Find winner(s)
                var max = -Infinity, indexMax = [];
                for(var i = 0; i < reactionCountsArray.length; ++i)
                    if(reactionCountsArray[i] > max) max = reactionCountsArray[i], indexMax = [i];
                    else if(reactionCountsArray[i] === max) indexMax.push(i);

                // Display winner(s)
                var winnersText = 'Unknown';
                if (reactionCountsArray[indexMax[0]] == 0) {
                    winnersText = 'No one voted!'
                } else {
                    for (var i = 0; i < indexMax.length; i++) {
                        if (winnersText === 'Unknown') {
                            winnersText = ''
                        }
                        winnersText += emojiList[indexMax[i]] + ': ' + options[indexMax[i]] + ' (' + reactionCountsArray[indexMax[i]] + ' vote(s))\n';
                    }
                }

                message.edit(embed.addField('Result', winnersText));
                message.channel.send(new Discord.RichEmbed()
                .setColor(embed.color)
                .setDescription('Poll done ([message link]('+message.url+'))'))

                cache.del(uid)
            });
        }
    }
}