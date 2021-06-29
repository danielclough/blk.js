const fs = require('fs');
const blackcoin = require('node-blackcoin-more');
require('dotenv').config({path: __dirname + '/.env'});
const inquirer = require('inquirer');
const shell = require('shelljs');

let user
let pass
let host
let port


const configure = {
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
}

const config = {
	"user": process.env.RPCUSER,
	"pass": process.env.RPCPASSWORD,
	"host": process.env.HOST,
	"port": process.env.PORT,
}

async function test() {
	if (!config.user || !config.pass || !config.host || !config.port) {
	  	config.user = await configure.getUser()
	  	config.pass = await configure.getPass()
	  	config.host = await configure.getHost()
	  	config.port = await configure.getPort()
	  	process.exit(0)
	} 
}
module.exports = {config, configure, test}