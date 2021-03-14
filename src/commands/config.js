const inquirer = require('inquirer');


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

config = {
	user: response.user,
	password: response.password,
	host: response.host,
	port: response.port
}

console.log(config);