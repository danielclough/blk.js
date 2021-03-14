const inquirer = require('inquirer');

async function config() {
  configure = {
  	user: response.user,
  	password: response.password,
  	host: response.host,
  	port: response.port
  }

  const response = await inquirer.prompt([
    {
      name: 'user',
      message: `What is your rpc user?`,
    },
  ]);

  const response = await inquirer.prompt([
    {
      name: 'password',
      message: `What is your rpc password?`,
    },
  ]);

  const response = await inquirer.prompt([
    {
      name: 'host',
      message: `What is your rpc host?`,
      default: 'localhost'
    },
  ]);

  const response = await inquirer.prompt([
    {
      name: 'port',
      message: `What is your rpc port?`,
      default: 15715
    },
  ]);
}
configure().catch(err => console.log(err));

console.log(config);