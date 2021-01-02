const inquirer = require('inquirer');
const config = require('../depends/blackcoin-config.js');
const blackcoin = require("node-blackcoin-more");

function warn() {
  if (!config.user || !config.password || !config.host || !config.port) {
    console.log(`blk/src/depends/blackcoin-config.js requires host, port, rpcuser and rpcpassword.`);
    process.exit(0);
  }
}
warn()

const client = new blackcoin.Client(config);

const {
  listunspent,
} = require('../depends/blackcoin-wallet')

listunspent(10,9999999);

listunspent().catch(err => console.log(err));
