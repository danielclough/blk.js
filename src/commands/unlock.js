const inquirer = require('inquirer');

const {
  walletpassphrase,
} = require('../depends/blackcoin-wallet');

async function unlock() {
  let {password} = await inquirer.prompt([
    {
      password: 'password',
      message: `Enter your password: `
    },
  ]);

walletpassphrase(password, 300, false)

}
unlock().catch(err => console.log(err));
