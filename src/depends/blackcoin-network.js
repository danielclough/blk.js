const blackcoin = require("node-blackcoin-more");

function addnode(node, arg) {
  return new Promise((resolve, reject) => {
    client.cmd('abortrescan', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function clearbanned() {
  return new Promise((resolve, reject) => {
    client.cmd('abortrescan', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function disconnectnode(node) {
  return new Promise((resolve, reject) => {
    client.cmd('abortrescan', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function getaddednodeinfo(dummy, node) {
  return new Promise((resolve, reject) => {
    client.cmd('abortrescan', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function getconnectioncount() {
  return new Promise((resolve, reject) => {
    client.cmd('abortrescan', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function getnettotals() {
  return new Promise((resolve, reject) => {
    client.cmd('abortrescan', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function getnetworkinfo() {
  return new Promise((resolve, reject) => {
    client.cmd('abortrescan', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function getpeerinfo() {
  return new Promise((resolve, reject) => {
    client.cmd('abortrescan', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function listbanned() {
  return new Promise((resolve, reject) => {
    client.cmd('abortrescan', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function ping() {
  return new Promise((resolve, reject) => {
    client.cmd('abortrescan', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function(setban, ip, arg, bantime, absolute) {
  return new Promise((resolve, reject) => {
    client.cmd('abortrescan', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}