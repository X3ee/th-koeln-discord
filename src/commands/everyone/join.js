const commando = require('discord.js-commando');
const config = require('../../config.json');
const { deleteCommandMessages } = require('../../util.js');

module.exports = class joinCommand extends commando.Command {
  constructor (client) {
    super(client, {
      'name': 'join',
      'memberName': 'join',
      'aliases': ['add', 'beitreten'],
      'group': 'everyone',
      'description': 'join a discord role',
      'guildOnly': true,
      'args': [
        {
          'key': 'role',
          'prompt': 'which role do you want to join ?',
          'type': 'role'
        }
      ]
    });
  }

  run (msg, args) {
    if (msg.channel.id === config.roleChannel) {
      return;
    }

    // TODO: check if user has already an role

    deleteCommandMessages(msg);
    return msg.embed();
  }
};
