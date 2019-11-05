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

  run (msg, args) {
    if (msg.channel.id === config.roleChannel) {
      return;
    }

    // TODO: check if user has no roles

    deleteCommandMessages(msg);
    return msg.embed();
  }
};
