const Discord = require('discord.js');
const fs = require('fs')
const config = require('./data/config.json')

const client = new Discord.Client({
  autoReconnect: true,
  messageCacheMaxSize: 10,
  messageCacheLifetime: 30,
  messageSweepInterval: 35
});
const color = config.color
const prefix = config.prefix

client.once('ready', () => {
	console.log('Ready!');
  client.user.setActivity('for '+prefix+'help', { type: 'WATCHING' });
});

client.on('message', (message) => {

  const args = message.content.split(' ');
  const command = message.content.split(' ')[0]

  if(message.author.bot || !command.startsWith(prefix) || message.channel.type === 'dm') return;

  const cmd = client.commands.get(command.slice(prefix.length))
  if(cmd)
    cmd.run(client, message, args, config, color)
})

client.commands = new Discord.Collection();
  fs.readdir('./data/commands', (err, files) => {
    if(err) console.error(err)
    const jsFiles = files.filter(f => f.split('.').pop() === 'js')
    if(jsFiles.length <= 0) {
      console.log('No commands loaded')
      return;
    }
    console.log('[Commands Loaded] ' + jsFiles.length)

    jsFiles.forEach((f, i) => {
      const props = require('./data/commands/' + f)
      client.commands.set(f.slice(0, -3), props)
    })
  })

client.login(config.token);