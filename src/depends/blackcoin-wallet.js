const blackcoin = require("node-blackcoin-more");
const config = require('./blackcoin-config.js');


function warn() {
  if (!config.user || !config.pass || !config.host || !config.port) {
    console.log(`blk/src/depends/blackcoin-config.js requires host, port, user and password.`);
    process.exit(0);
  }
}
warn()

const client = new blackcoin.Client(config);

function abandontransaction(txid) {
  return new Promise((resolve, reject) => {
    client.cmd('abandontransaction', txid, function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function abortrescan() {
  return new Promise((resolve, reject) => {
    client.cmd('abortrescan', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function addmultisigaddress(nrequired, key, account, address_type) {
  return new Promise((resolve, reject) => {
    client.cmd('addmultisigaddress', nrequired, key, account, address_type, function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}


function backupwallet(destination) {
  return new Promise((resolve, reject) => {
    client.cmd('backupwallet', destination, function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function burn(amount, hex) {
  return new Promise((resolve, reject) => {
    client.cmd('burn', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function dumpprivkey(address) {
  return new Promise((resolve, reject) => {
    client.cmd('dumpprivkey', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function dumpwallet(filename) {
  return new Promise((resolve, reject) => {
    client.cmd('dumpwallet', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}


function getbalance() {
  return new Promise((resolve, reject) => {
    client.cmd('getbalance', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function getnewaddress() {
  return new Promise((resolve, reject) => {
    client.cmd('getnewaddress', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function getrawchangeaddress() {
  return new Promise((resolve, reject) => {
    client.cmd('getrawchangeaddress', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function getreceivedbyaccount(account, minconf) {
  return new Promise((resolve, reject) => {
    client.cmd('getreceivedbyaccount', minconf, function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function getreceivedbyaddress(address, minconf) {
  return new Promise((resolve, reject) => {
    client.cmd('getreceivedbyaddress', minconf, function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function gettransaction(txid, includeWatchonly) {
  return new Promise((resolve, reject) => {
    client.cmd('gettransaction', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}


function getunconfirmedbalance() {
  return new Promise((resolve, reject) => {
    client.cmd('getunconfirmedbalance', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function getwalletinfo() {
  return new Promise((resolve, reject) => {
    client.cmd('getwalletinfo', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function importaddress(address, label, rescan, p2sh) {
  return new Promise((resolve, reject) => {
    client.cmd('importaddress', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function importprivkey(privkey, label, rescan) {
  return new Promise((resolve, reject) => {
    client.cmd('importprivkey', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function importprunedfunds() {
  return new Promise((resolve, reject) => {
    client.cmd('importprunedfunds', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function importpubkey(pubkey, label, rescan) {
  return new Promise((resolve, reject) => {
    client.cmd('importpubkey', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function importwallet(filename) {
  return new Promise((resolve, reject) => {
    client.cmd('importwallet', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function keypoolrefill(newsize) {
  return new Promise((resolve, reject) => {
    client.cmd('keypoolrefill', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function listaccounts(minconf, includeWatchonly) {
  return new Promise((resolve, reject) => {
    client.cmd('listaccounts', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function listaddressgroupings() {
  return new Promise((resolve, reject) => {
    client.cmd('listaddressgroupings', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function listlockunspent() {
  return new Promise((resolve, reject) => {
    client.cmd('listlockunspent', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function listreceivedbyaccount(minconf, includeempty, includeWatchonly) {
  return new Promise((resolve, reject) => {
    client.cmd('listreceivedbyaccount', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function listreceivedbyaddress(minconf, includeempty, includeWatchonly) {
  return new Promise((resolve, reject) => {
    client.cmd('listreceivedbyaddress', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function listsinceblock(blockhash, targetConfirmations, includeWatchonly) {
  return new Promise((resolve, reject) => {
    client.cmd('listsinceblock', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function listtransactions(account, count, from, includeWatchonly) {
  return new Promise((resolve, reject) => {
    client.cmd('listtransactions', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function listunspent() {
  return new Promise((resolve, reject) => {
    client.cmd('listunspent', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function lockunspent() {
  return new Promise((resolve, reject) => {
    client.cmd('lockunspent', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function move(fromaccount, toaccount, amount, minconf, comment) {
  return new Promise((resolve, reject) => {
    client.cmd('move', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function removeprunedfunds(txid) {
  return new Promise((resolve, reject) => {
    client.cmd('removeprunedfunds', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function reservebalance(reserve, amount) {
  return new Promise((resolve, reject) => {
    client.cmd('reservebalance', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function sendfrom(fromAccount, toAddress, amount, minconf, comment, commentTo) {
  return new Promise((resolve, reject) => {
    client.cmd('sendfrom', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function sendmany(fromaccount, address, amount, minconf, comment, address) {
  return new Promise((resolve, reject) => {
    client.cmd('sendmany', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function sendtoaddress(address, amount, comment, commentTo, subtractfeefromamount) {
  return new Promise((resolve, reject) => {
    client.cmd('sendtoaddress', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function setaccount(address, account) {
  return new Promise((resolve, reject) => {
    client.cmd('setaccount', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function settxfee(amount) {
  return new Promise((resolve, reject) => {
    client.cmd('settxfee', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function signmessage(blackcoinaddress, message) {
  return new Promise((resolve, reject) => {
    client.cmd('signmessage', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function walletlock() {
  return new Promise((resolve, reject) => {
    client.cmd('walletlock', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function walletpassphrase(passphrase, timeout, stakingonly) {
  return new Promise((resolve, reject) => {
    client.cmd('walletpassphrase', passphrase, timeout, stakingonly, function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function walletpassphrasechange(walletpassphrasechange, oldpassphrase, newpassphrase) {
  return new Promise((resolve, reject) => {
    client.cmd('walletpassphrasechange', function(err, data){
      if (err) return reject(err);
      resolve(data);
    });
  });
}

module.exports = (function(){
  return {
    abandontransaction,
    abortrescan,
    addmultisigaddress,
    backupwallet,
    burn,
    dumpprivkey,
    dumpwallet,
    getbalance,
    getnewaddress,
    getrawchangeaddress,
    getreceivedbyaccount,
    getreceivedbyaddress,
    gettransaction,
    getunconfirmedbalance,
    getwalletinfo,
    importaddress,
    importprivkey,
    importprunedfunds,
    importpubkey,
    importwallet,
    keypoolrefill,
    listaccounts,
    listaddressgroupings,
    listlockunspent,
    listreceivedbyaccount,
    listreceivedbyaddress,
    listsinceblock,
    listtransactions,
    listunspent,
    lockunspent,
    move,
    removeprunedfunds,
    reservebalance,
    sendfrom,
    sendmany,
    sendtoaddress,
    setaccount,
    settxfee,
    signmessage,
    walletlock,
    walletpassphrase,
    walletpassphrasechange,
  }
})();