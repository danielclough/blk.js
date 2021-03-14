const blackcoin = require("node-blackcoin-more");
const config = require('./blackcoin-config.js');

function warn() {
  if (!config.user || !config.pass || !config.host || !config.port) {
    console.log(`depends/blackcoin-config.js requires host, port, user and pass.`);
    console.log(`user: ${config.user}, pass: ${config.pass}, host: ${config.host}, port: ${config.port}`)
    process.exit(0);
  }
}
warn()

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