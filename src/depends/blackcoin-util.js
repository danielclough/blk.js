const blackcoin = require("node-blackcoin-more");
const config = require('./config.js');

config.warn()

const client = new blackcoin.Client(config);

function createmultisig(nrequired, key) {
  return new Promise((resolve, reject) => {
    client.cmd('createmultisig', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function estimatefee(nblocks) {
  return new Promise((resolve, reject) => {
    client.cmd('estimatefee', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function estimatepriority(nblocks) {
  return new Promise((resolve, reject) => {
    client.cmd('estimatepriority', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function estimatesmartfee(nblocks) {
  return new Promise((resolve, reject) => {
    client.cmd('estimatesmartfee', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function estimatesmartpriority(nblocks) {
  return new Promise((resolve, reject) => {
    client.cmd('abortrescan', estimatesmartpriority, function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function signmessagewithprivkey(privkey, message) {
  return new Promise((resolve, reject) => {
    client.cmd('abortrescan', signmessagewithprivkey, function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function validateaddress(bitcoinaddress) {
  return new Promise((resolve, reject) => {
    client.cmd('validateaddress', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function verifymessage(obj) {
  return new Promise((resolve, reject) => {
    client.cmd('verifymessage', obj.args[0], obj.args[1], obj.args[2], function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}


module.exports = (function(){
  return {
    createmultisig,
    estimatefee,
    estimatepriority,
    estimatesmartfee,
    estimatesmartpriority,
    signmessagewithprivkey,
    validateaddress,
    verifymessage,
  }
})();