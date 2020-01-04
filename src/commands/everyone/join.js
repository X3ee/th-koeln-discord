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
      'description': 'Füge eine Rolle hinzu',
      'guildOnly': true,
      'argsPromptLimit': 0,
      'args': [
        {
          'key': 'role',
          'prompt': 'Welche Rolle willst du hinzufügen ?',
          'type': 'string'
        }
      ]
    });
  }

  run (msg, args) {
    if (msg.channel.id !== config.roleChannel) {
      return;
    }

    deleteCommandMessages(msg);

    for (let key in config.roles) {
      if (msg.member.roles.has(config.roles[key])) {
        return msg.reply("Du hast bereits eine Rolle.");
      }
    };

    if (config.roles.hasOwnProperty(args.role.toLowerCase())) {
      msg.member.roles.add(config.roles[args.role.toLowerCase()]);
      return msg.reply("Rolle hinzugefügt.");
    } else {
      return msg.reply("Diese Rolle existiert nicht.");
    }
  }
};
