import blackcoin from 'node-blackcoin-more'
import config from './config.js'

const client = new blackcoin.Client(config);

export function getbestblockhash() {
  return new Promise((resolve, reject) => {
    client.cmd('getbestblockhash', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}
export function getblock (hash, verbose) {
  return new Promise((resolve, reject) => {
    client.cmd('getblock', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}
export function getblockchaininfo() {
  return new Promise((resolve, reject) => {
    client.cmd('getblockchaininfo', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}
export function getblockcount() {
  return new Promise((resolve, reject) => {
    client.cmd('getblockcount', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}
export function getblockhash(index) {
  return new Promise((resolve, reject) => {
    client.cmd('getblockhash', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}
export function getblockheader(hash, verbose) {
  return new Promise((resolve, reject) => {
    client.cmd('getblockheader', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}
export function getchaintips() {
  return new Promise((resolve, reject) => {
    client.cmd('getchaintips', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}
export function getdifficulty() {
  return new Promise((resolve, reject) => {
    client.cmd('getdifficulty', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}
export function getmempoolancestors(txid, verbose) {
  return new Promise((resolve, reject) => {
    client.cmd('getmempoolancestors', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}
export function getmempooldescendants(txid, verbose) {
  return new Promise((resolve, reject) => {
    client.cmd('getmempooldescendants', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}
export function getmempoolentry(txid) {
  return new Promise((resolve, reject) => {
    client.cmd('getmempoolentry', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}
export function getmempoolinfo() {
  return new Promise((resolve, reject) => {
    client.cmd('getmempoolinfo', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}
export function getrawmempool(verbose) {
  return new Promise((resolve, reject) => {
    client.cmd('getrawmempool', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}
export function gettxout(txid, n, includemempool) {
  return new Promise((resolve, reject) => {
    client.cmd('gettxout', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}
export function gettxoutproof(txid, blockhash) {
  return new Promise((resolve, reject) => {
    client.cmd('gettxoutproof', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}
export function gettxoutsetinfo() {
  return new Promise((resolve, reject) => {
    client.cmd('gettxoutsetinfo', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}
export function verifychain(checklevel, numblocks) {
  return new Promise((resolve, reject) => {
    client.cmd('verifychain', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}
export function verifytxoutproof(proof) {
  return new Promise((resolve, reject) => {
    client.cmd('verifytxoutproof', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}
