const commando = require('discord.js-commando');
const discord = require('discord.js');
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
    if (msg.channel.id !== config.roleChannel) {
      return;
    }

    let embed = new discord.MessageEmbed()
    .setTitle("TH Köln")
    .setDescription("Rollen die du hinzufügen kannst für dein Studiengang.")
    .setFooter(msg.author.username, `https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}.png`)
    .setTimestamp(new Date());

    let allRoles = "";
    for (let key in config.roles) {
      allRoles += `**${key.toUpperCase()}**\n`;
    }

    embed.addField("__**Verfügbare Studiengänge**__", allRoles);

    deleteCommandMessages(msg);
    return msg.embed(embed);
  }
};
