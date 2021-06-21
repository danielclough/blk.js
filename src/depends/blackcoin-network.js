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
export function addnode(node, arg) {
  return new Promise((resolve, reject) => {
    client.cmd('addnode', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

export function clearbanned() {
  return new Promise((resolve, reject) => {
    client.cmd('clearbanned', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

export function disconnectnode(node) {
  return new Promise((resolve, reject) => {
    client.cmd('disconnectnode', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

export function getaddednodeinfo(dummy, node) {
  return new Promise((resolve, reject) => {
    client.cmd('getaddednodeinfo', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

export function getconnectioncount() {
  return new Promise((resolve, reject) => {
    client.cmd('getconnectioncount', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

export function getnettotals() {
  return new Promise((resolve, reject) => {
    client.cmd('getnettotals', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

export function getnetworkinfo() {
  return new Promise((resolve, reject) => {
    client.cmd('getnetworkinfo', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

export function getpeerinfo() {
  return new Promise((resolve, reject) => {
    client.cmd('getpeerinfo', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

export function listbanned() {
  return new Promise((resolve, reject) => {
    client.cmd('listbanned', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

export function ping() {
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