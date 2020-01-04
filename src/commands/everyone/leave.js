const commando = require('discord.js-commando');
const config = require('../../config.json');
const { deleteCommandMessages } = require('../../util.js');

module.exports = class leaveCommand extends commando.Command {
  constructor (client) {
    super(client, {
      'name': 'leave',
      'memberName': 'leave',
      'aliases': ['remove', 'verlassen', 'austreten'],
      'group': 'everyone',
      'description': 'leave your discord role',
      'guildOnly': true
    });
  }

  run (msg) {
    if (msg.channel.id !== config.roleChannel) {
      return;
    }

    deleteCommandMessages(msg);

    for (let key in config.roles) {
      if (msg.member.roles.has(config.roles[key])) {
        msg.member.roles.remove(config.roles[key]);
        return msg.reply(`Die Rolle ${key.toUpperCase()} wurde entfernt.`);
      }
    };

    return msg.reply("Du bist in keiner Rolle.");
  }
};
