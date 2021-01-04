const inquirer = require('inquirer');

const {
  walletpassphrase,
} = require('../depends/blackcoin-wallet');

async function unlock() {
  let {password} = await inquirer.prompt([
    {
      name: 'password',
      message: `Enter your password: `
    },
  ]);

walletpassphrase(password, 9999999, false)

}
unlock().catch(err => console.log(err));
