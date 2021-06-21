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
    client.cmd('abortrescan', estimatesmartpriority(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function signmessagewithprivkey(privkey, message) {
  return new Promise((resolve, reject) => {
    client.cmd('abortrescan', signmessagewithprivkey(err, data){
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

function verifymessage(blackcoinaddress, signature, message) {
  return new Promise((resolve, reject) => {
    client.cmd('verifymessage', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}