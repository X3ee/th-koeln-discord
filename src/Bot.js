const Commando = require('discord.js-commando');
const path = require('path');
const sqlite = require('sqlite');
const fs = require('fs');

class Bot extends Commando.Client {
  constructor(token, ownerid, commandprefix) {
    super({
      "owner": (ownerid) ? ownerid : null,
      "commandPrefix": (commandprefix) ? commandprefix : '-'
    });
    this.token = token;
    this.isReady = false;
  }

  init() {
    // dynamically register our events based on the content of the events folder
    fs.readdir("./src/events/", (err, files) => {
      if (err) return console.error(err);
      files.forEach(file => {
        let eventFunction = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        this.on(eventName, (...args) => eventFunction.run(this, ...args));
      });
    });

    // set provider sqlite3 so we can save our settings
    this.setProvider(
      sqlite.open(path.join(__dirname, 'settings.sqlite3')).then(db => new Commando.SQLiteProvider(db))
    ).catch(console.error);

    // register default groups and commands
    this.registry
      .registerGroups([
        ['everyone', 'Commands for Everyone']
      ])
      .registerDefaultGroups()
      .registerDefaultTypes()
      .registerDefaultCommands({
        'help': true,
        'prefix': true,
        'ping': true,
        'eval_': false,
        'commandState': true,
        'unknownCommand': false
      })
      .registerCommandsIn(path.join(__dirname, 'commands'));

    // login with bot token
    return this.login(this.token);
  }

  deinit() {
    this.isReady = false;
    return this.destroy();
  }
}

module.exports = Bot;
