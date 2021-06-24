const blackcoin = require("node-blackcoin-more");
const config = require('./config.js');

config.warn()

const client = new blackcoin.Client(config);
function addnode(node, arg) {
  return new Promise((resolve, reject) => {
    client.cmd('addnode', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function clearbanned() {
  return new Promise((resolve, reject) => {
    client.cmd('clearbanned', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function disconnectnode(node) {
  return new Promise((resolve, reject) => {
    client.cmd('disconnectnode', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function getaddednodeinfo(dummy, node) {
  return new Promise((resolve, reject) => {
    client.cmd('getaddednodeinfo', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function getconnectioncount() {
  return new Promise((resolve, reject) => {
    client.cmd('getconnectioncount', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function getnettotals() {
  return new Promise((resolve, reject) => {
    client.cmd('getnettotals', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function getnetworkinfo() {
  return new Promise((resolve, reject) => {
    client.cmd('getnetworkinfo', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function getpeerinfo() {
  return new Promise((resolve, reject) => {
    client.cmd('getpeerinfo', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function listbanned() {
  return new Promise((resolve, reject) => {
    client.cmd('listbanned', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function ping() {
  return new Promise((resolve, reject) => {
    client.cmd('ping', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

/*function(setban, ip, arg, bantime, absolute) {
  return new Promise((resolve, reject) => {
    client.cmd('setban', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}*/

module.exports = (function(){
  return {
    addnode,
    clearbanned,
    disconnectnode,
    getaddednodeinfo,
    getconnectioncount,
    getnettotals,
    getnetworkinfo,
    getpeerinfo,
    listbanned,
    ping
  }
})();