const inquirer = require('inquirer');

const {walletpassphrase} = require('../depends/blackcoin-wallet')

async function unlock() {
  let timeout = 9999999 // hard coded in blackcoin-wallet.js for now
  let stakingonly
  let passphrase 

  passphrase = await inquirer.prompt([
    {
      name: 'passphrase',
      type: 'password',
      message: `What is your passphrase?`,
    },
  ]);

  stakingonly = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'stakingonly',
      message: `Unlock for staking only?`,
      default: true
    },
  ]);

  walletpassphrase(passphrase, stakingonly)
  walletpassphrase().catch(err => console.log(err));
}
unlock().catch(err => console.log(err));
