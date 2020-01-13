const Discord = require('discord.js');

const lastChar = (str) => str.split('').reverse().join(',').replace(',', '')[str.length === str.length + 1 ? 1 : 0];

function sleep(ms){
    return new Promise(resolve=>{
      setTimeout(resolve,ms)
    })
  }

module.exports = {
    run: function (time, options, message, embed, emojiList) {
        //if (isNaN(time) || time > 120 || time < 10) {
            //message.channel.send('error 30')
        //}

        message.channel.send(embed)
        .then(async function (message) {
            let reactionArray = [];
            let count = 0;
            for (var option in options) {
            reactionArray[count] = await message.react(emojiList[count]).catch((err) => message.edit(embed.addField('Error', err)));
            count += 1
            }

            if (time) {
            // Re-fetch the message and get reaction counts
            message.channel.fetchMessage(message.id)
                .then(async function (message) {
                await sleep(time*60000)
                var reactionCountsArray = [];                               
                for (var i = 0; i < reactionArray.length; i++) {
                    try {
                        reactionCountsArray[i] = message.reactions.get(emojiList[i]).count-1;
                    } catch(err) {}
                }

                // Find winner(s)
                var max = -Infinity, indexMax = [];
                for(var i = 0; i < reactionCountsArray.length; ++i)
                    if(reactionCountsArray[i] > max) max = reactionCountsArray[i], indexMax = [i];
                    else if(reactionCountsArray[i] === max) indexMax.push(i);

                // Display winner(s)
                var winnersText = '';
                if (reactionCountsArray[indexMax[0]] == 0) {
                    winnersText = 'No one voted!'
                } else {
                    for (var i = 0; i < indexMax.length; i++) {
                    winnersText += emojiList[indexMax[i]] + ': ' + options[indexMax[i]] + ' (' + reactionCountsArray[indexMax[i]] + ' vote(s))\n';
                    }
                }
                message.edit(embed.addField('Result', winnersText));
                message.channel.send(new Discord.RichEmbed()
                .setColor(embed.color)
                .setTitle('Poll done')
                .setDescription('Message link: '+message.url))
                });
            }
        })
    }
}