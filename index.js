const Discord = require('discord.js');
const fs = require('fs');
const winston = require('winston');

const config = require('./data/config.json');
const reactionpoll = require('./data/utils/reactionpoll');
const cache = require('./data/utils/cache');

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: './combined.log' }),
    new winston.transports.Console()
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: './exceptions.log' })
  ],
  exitOnError: false
});

const client = new Discord.Client({
  autoReconnect: true,
  messageCacheMaxSize: 10,
  messageCacheLifetime: 30,
  messageSweepInterval: 35
});
const color = config.color
const prefix = config.prefix

client.once('ready', () => {
  setInterval(() => {
    client.user.setPresence({
      status: "online",
      game: {
          name: 'for '+prefix+'help',
          type: "WATCHING"
      }
    });
  }, 900000); // Runs this every 15 minutes.

  try {
    var file = fs.readFileSync('./cache.json', 'utf8')
  } catch (err) {
    if (err.code === 'ENOENT') {
      fs.writeFileSync('./cache.json', '{}', 'utf8')
      var file = fs.readFileSync('./cache.json', 'utf8')
    }
  }
  var cacheFile = JSON.parse(file)

  Object.keys(cacheFile).forEach(uid => {
    try {
      let channel = client.channels.get(cacheFile[uid]["message"]["channelId"])
      channel.fetchMessage(cacheFile[uid]["message"]["id"])
        .then(message => reactionpoll.run(uid, cacheFile[uid]['time'], cacheFile[uid]['options'], message, cacheFile[uid]['embed'], cacheFile[uid]['emojiList'], false))
        .catch(error => {
          console.error('onRejected function called: ' + error.message)
          cache.del(uid)
        })
    } catch (err) {
      cache.del(uid)
    }
  })
  logger.log('info', 'successfully restored cache');

  console.log('Ready!');
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
