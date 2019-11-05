const config = require('./config.json');

const deleteCommandMessages = function (msg) {
  if (msg.deletable && config.general.deleteCommandMessages) {
    return msg.delete();
  }
};

module.exports = {
  deleteCommandMessages
}
