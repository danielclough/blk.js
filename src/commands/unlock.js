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

const {walletpassphrase} = require('../depends/blackcoin-wallet')

let timeout = 9999999 
let stakingonly
let passphrase 


const response = await inquirer.prompt([
  {
    name: 'passphrase',
    message: `What is your passphrase?`,
  },
]);
passphrase = response.passphrase;

const response = await inquirer.prompt([
  {
    type: 'list',
    name: 'stakingonly',
    message: `Unlock for staking only?`,
    choices: [true, false]
    default: true
  },
]);
stakingonly = response.stakingonly;

walletpassphrase(passphrase, timeout, stakingonly)
walletpassphrase().catch(err => console.log(err));
