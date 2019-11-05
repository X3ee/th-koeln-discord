const Bot = require('./Bot.js');
const config = require('./config.json');

const start = function () {
  new Bot(config.general.token, config.general.ownerID, config.general.globalCommandPrefix).init();
};

start();
