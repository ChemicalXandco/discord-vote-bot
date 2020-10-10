const Discord = require('discord.js');

module.exports = {
        'args': '`{command}` - The command to get help on.\n',
        'desc': "Get help on how to use this bots' commands."
    }

module.exports.run = (client, message, args, config, color) => {

        var embed = new Discord.RichEmbed()
        .setColor(color)
        .setTitle(client.user.username + ' Help')
        .setDescription(
                'Square brackets ([]) around a word indicate that it is an argument where you have to input a value of your choosing.\n'+
                'Curly brackets ({}) around a word indicate that it is an optional argument where you can input a value of your choosing.\n'+
                'Do `help [command]` to get help on a specific command.\n\n'+
                'You can get help on the [support server](https://discord.gg/wbt5aYS)')

        if (args.length < 2) {
                let commandsList = '`'
                for (let key of client.commands.keys()) {
                        commandsList += key+'`, `'
                }
                commandsList = commandsList.substring(0, commandsList.length-3);
                embed.addField('Commands', commandsList)
        } else {
                let commandName = args[1]
                embed.addField('Command', '`'+commandName+'`')
                let command = client.commands.get(commandName)
                if (command) {
                        embed.addField('Arguments', command.args)
                        embed.addField('Description', command.desc)
                } else {
                        embed.addField('Error', 'Command does not exist.')
                }
        }

        return message.channel.send(embed)

}
