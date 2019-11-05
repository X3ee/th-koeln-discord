exports.run = (client) => {
    console.log(`Bot ready and logged in as ${client.user.tag} (${client.user.id}). Prefix set to ${client.commandPrefix}`);
    client.isReady = true;
}