const blackcoin = require("node-blackcoin-more");
const config = require('./config.js');

const client = new blackcoin.Client(config);

function getinfo() {
  return new Promise((resolve, reject) => {
    client.cmd('getinfo', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}
function help(command) {
  return new Promise((resolve, reject) => {
    client.cmd('help', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}
function stop() {
  return new Promise((resolve, reject) => {
    client.cmd('stop', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}
function uptime() {
  return new Promise((resolve, reject) => {
    client.cmd('uptime', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

module.exports = (function(){
  return {
    getinfo,
    help,
    stop,
    uptime
  }
})();