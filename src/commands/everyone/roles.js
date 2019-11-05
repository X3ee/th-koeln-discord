const commando = require('discord.js-commando');
const config = require('../../config.json');
const { deleteCommandMessages } = require('../../util.js');

module.exports = class rolesCommand extends commando.Command {
  constructor (client) {
    super(client, {
      'name': 'roles',
      'memberName': 'roles',
      'aliases': ['role', 'rolle', 'rollen'],
      'group': 'everyone',
      'description': 'get all available roles you can join',
      'guildOnly': true
    });
  }

  run (msg, args) {
    if (msg.channel.id === config.roleChannel) {
      return;
    }

    // TODO: build embed with all roles from config obj: 'roles'

    deleteCommandMessages(msg);
    return msg.embed();
  }
};
