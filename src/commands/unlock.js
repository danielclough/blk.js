import inquirer from 'inquirer'
import { walletpassphrase } from '../depends/blackcoin-wallet.js'

async function unlock() {
  let timeout = 9999999 
  
  const passphrase = await inquirer.prompt([
    {
      name: 'passphrase',
      message: `What is your passphrase?`,
    },
  ]);

  const stakingonly = await inquirer.prompt([
    {
      type: 'list',
      name: 'stakingonly',
      message: `Unlock for staking only?`,
      choices: ['true', 'false'],
      default: 'true'
    },
  ]);

  walletpassphrase(passphrase, timeout, stakingonly)
  walletpassphrase().catch(err => console.log(err));
}
unlock().catch(err => console.log(err));

export default unlock