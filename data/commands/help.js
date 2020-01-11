const Discord = require("discord.js");

module.exports.run = (client, message, args, config, color) => {
    
        var embed = new Discord.RichEmbed()
        .setColor(color)
        .setTitle(client.user.username + " Help")
        .setDescription('`help` - post available commands\n' + 
                        '`startsimple [time(minutes)] [question]` - start a simple yes/no vote\n' +
                        '`startoption [time(minutes)] [option1;option2;option3;...] [question]` - start a vote with up to 20 options')
                        return message.channel.send(embed)
    
}
module.exports.help = {
    name: "help",
    info: "Help command"
}
