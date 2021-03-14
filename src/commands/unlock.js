const inquirer = require('inquirer');

const {walletpassphrase} = require('../depends/blackcoin-wallet')

async function unlock() {
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
      choices: [true, false],
      default: true
    },
  ]);
  stakingonly = response.stakingonly;

  walletpassphrase(passphrase, timeout, stakingonly)
  walletpassphrase().catch(err => console.log(err));
}
unlock().catch(err => console.log(err));
