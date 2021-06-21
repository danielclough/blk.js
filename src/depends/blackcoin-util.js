import blackcoin from 'node-blackcoin-more'
import config from './blackcoin-config.js'

function warn() {
  if (!config.user || !config.pass || !config.host || !config.port) {
    console.log(`depends/blackcoin-config.js requires host, port, user and pass.`);
    console.log(`user: ${config.user}, pass: ${config.pass}, host: ${config.host}, port: ${config.port}`)
    process.exit(0);
  }
}
warn()

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