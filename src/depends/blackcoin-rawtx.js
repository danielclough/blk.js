import blackcoin from 'node-blackcoin-more'
import config from '../../config.js'

export function warn() {
  if (!config.user || !config.pass || !config.host || !config.port) {
    console.log(`depends/blackcoin-config.js requires host, port, user and pass.`);
    console.log(`user: ${config.user}, pass: ${config.pass}, host: ${config.host}, port: ${config.port}`)
    process.exit(0);
  }
}
warn()

const client = new blackcoin.Client(config);

export function createrawtransaction(utxos, output) {
  return new Promise((resolve, reject) => {
    client.cmd('createrawtransaction', utxos, output, function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

export function decoderawtransaction(raw) {
  return new Promise((resolve, reject) => {
    client.cmd('decoderawtransaction', raw, function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

export function decodescript(raw) {
  return new Promise((resolve, reject) => {
    client.cmd('decodescript', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

export function fundrawtransaction(raw, options) {
  return new Promise((resolve, reject) => {
    client.cmd('fundrawtransaction', raw, function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

export function getnormalizedtxid(raw) {
  return new Promise((resolve, reject) => {
    client.cmd('getnormalizedtxid', raw, function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

export function getrawtransaction(txid, verbose) {
  return new Promise((resolve, reject) => {
    client.cmd('getrawtransaction', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

export function sendrawtransaction(raw) {
  return new Promise((resolve, reject) => {
    client.cmd('sendrawtransaction', raw, function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

export function signrawtransaction(raw) {
  return new Promise((resolve, reject) => {
    client.cmd('signrawtransaction', raw, function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

module.exports = (function(){
  return {
    createrawtransaction,
    decoderawtransaction,
    decodescript,
    fundrawtransaction,
    getnormalizedtxid,
    getrawtransaction,
    sendrawtransaction,
    signrawtransaction,
  }
})();