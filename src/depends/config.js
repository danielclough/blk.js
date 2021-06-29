const blackcoin = require('node-blackcoin-more');
require('dotenv').config();
const inquirer = require('inquirer');
const shell = require('shelljs');

let user
let pass
let host
let port

const config = {
	async getUser() {
		user = await inquirer.prompt([
		    {
		      name: 'user',
		      message: `What is your rpc user?`,
		      default: 'daniel'
		    },
		]);
		return user.user
	},
	async getPass() {
		pass = await inquirer.prompt([
		    {
		      name: 'pass',
		      type: 'password',
		      message: `What is your rpc password?`,
		      default: 'j77GUjKaca0vTgwA'
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
	"user": (process.env.RPCUSER || this.getUser),
	"pass": (process.env.RPCPASSWORD || this.getPass),
	"host": (process.env.HOST || this.getHost),
	"port": (process.env.PORT || this.getPort),
}

module.exports = config
