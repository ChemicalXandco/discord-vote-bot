const lastChar = (str) => str.split('').reverse().join(',').replace(',', '')[str.length === str.length + 1 ? 1 : 0];

module.exports.run = (client, message, args, config, color) => {

    let splitCommand = message.content.split(" ");
    let time = parseFloat(splitCommand.slice(1).shift());
    let secondSection = (splitCommand.slice(2) + '').replace(/,/g, ' ');
    let secondSectionSplitted = secondSection.split(';');
    let question = secondSectionSplitted.slice(-1)[0]
    let options = secondSectionSplitted.slice(0, secondSectionSplitted.length-1)
    if (options.length > 20) {
      options = options.slice(0, 20)
    }
    console.log(options)
    if (lastChar(question) != "?") {
      question += "?"
    }
    if (!(isNaN(time)) && (time <= 120)) {
      if (time >= 10) {
        let optionText = ""
        let count = 0;
        for (var option in options) {
          console.log(option)
          optionText += "\n"+emojiLetterList[count]+" - "+options[option]
          count += 1
        }
        message.channel.send('`'+message.author.username+'`'+' says `'+question+'` vote ending in '+time+' minutes'+optionText)
          .then(async function (message) {
            let reactionArray = [];
            let count = 0;
            for (var option in options) {
              reactionArray[count] = await message.react(emojiLetterList[count]);
              count += 1
            }

            if (time) {
              // Re-fetch the message and get reaction counts
              message.channel.fetchMessage(message.id)
                .then(async function (message) {
                  await sleep(time*60000)
                  var reactionCountsArray = [];                               
                  for (var i = 0; i < reactionArray.length; i++) {
                    reactionCountsArray[i] = message.reactions.get(emojiLetterList[i]).count-1;
                  }

                  // Find winner(s)
                  var max = -Infinity, indexMax = [];
                  for(var i = 0; i < reactionCountsArray.length; ++i)
                    if(reactionCountsArray[i] > max) max = reactionCountsArray[i], indexMax = [i];
                    else if(reactionCountsArray[i] === max) indexMax.push(i);

                  // Display winner(s)
                  console.log(reactionCountsArray); // Debugging votes
                  var winnersText = "";
                  if (reactionCountsArray[indexMax[0]] == 0) {
                    winnersText = "No one voted!"
                  } else {
                    for (var i = 0; i < indexMax.length; i++) {
                      winnersText += emojiLetterList[indexMax[i]] + ": " + options[indexMax[i]] + " (" + reactionCountsArray[indexMax[i]] + " vote(s))\n";
                    }
                  }
                  message.channel.send("**Result for `"+question+"`:** " + winnersText);
                });
            }
          })
      } else {
        message.channel.send('cannot start vote - must last for at least 10 minutes');
      }
    } else {
      message.channel.send('cannot start vote - cannot last for more then 2 hours');
    }
}