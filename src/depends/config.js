const blackcoin = require('node-blackcoin-more');
let dotenvfile = __dirname + '/.env'
require('dotenv').config({path: dotenvfile});
const inquirer = require('inquirer');

const config = {
	async getUser() {
		user = await inquirer.prompt([
		    {
		      name: 'user',
		      message: `What is your rpc user?`,
		      default: process.env.USER
		    },
		]);
		return user.user
	},
	async getPass() {
		pass = await inquirer.prompt([
		    {
		      name: 'pass',
		      type: 'password',
		      message: `What is your rpc password?`
		    },
		]);
		return pass.pass
	},
	async getHost() {
		host = await inquirer.prompt([
		    {
		      name: 'host',
		      message: `What is your rpc host?`,
		      default: 'localhost'
		    },
		]);
		return host.host
	},
	async getPort() {
		port = await inquirer.prompt([
		    {
		      name: 'port',
		      message: `What is your rpc port?`,
		      default: 15715
		    },
		]);
		return port.port
	},
	"dotenvfile": dotenvfile, 
	"user": process.env.RPCUSER,
	"pass": process.env.RPCPASSWORD,
	"host": process.env.HOST,
	"port": process.env.PORT
}

module.exports = config
