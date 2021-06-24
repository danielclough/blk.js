const blackcoin = require("node-blackcoin-more");
const config = require('./blackcoin-config.js');

config.warn()

const client = new blackcoin.Client(config);

function getstakinginfo() {
  return new Promise((resolve, reject) => {
    client.cmd('getstakinginfo', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function generate(numblocks, maxtries) {
  return new Promise((resolve, reject) => {
    client.cmd('generate', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function generatetoaddress(numblocks, address, maxtries) {
  return new Promise((resolve, reject) => {
    client.cmd('generatetoaddress', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

module.exports = (function(){
  return {
    getstakinginfo,
    generate,
    generatetoaddress
  }
})();