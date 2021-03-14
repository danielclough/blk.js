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

const {getwalletinfo} = require('../depends/blackcoin-wallet')
const {getstakinginfo} = require('../depends/blackcoin-mining')
const {getinfo} = require('../depends/blackcoin-control')
const {getnetworkinfo} = require('../depends/blackcoin-network')



getwalletinfo()
getwalletinfo().catch(err => console.log(err));

getstakinginfo()
getstakinginfo().catch(err => console.log(err));

getinfo()
getinfo().catch(err => console.log(err));

getnetworkinfo()
getnetworkinfo().catch(err => console.log(err));
