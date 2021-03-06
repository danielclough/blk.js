#!/usr/bin/env node
const fs = require('fs');
const pjson = require('./package.json');
const blk = require('commander')
const version = pjson.version
const rootDir = __dirname;
const config = require('./src/depends/config.js');

const test = async () => {
	if (!config.user || !config.pass || !config.host || !config.port) {
		config.user = await config.getUser()
		config.pass = await config.getPass()
		config.host = await config.getHost()
		config.port = await config.getPort()
		
		dotenvFile = `RPCUSER=${config.user}
RPCPASSWORD=${config.pass}
HOST=${config.host}
PORT=${config.port}`

		fs.exists((!config.dotenvPath), exists => {
		  if (!exists) {
		  	fs.writeFileSync( config.dotenvPath, dotenvFile);
		  	console.log(`.env file created: at ${config.dotenvPath}`)
		  	console.log(fs.readFileSync(config.dotenvPath, "utf8"));
		  }
		});
		process.exit(0)
	}
}

blk
	.command('install')
	.action(() => {
		const install = require('./src/commands/install.js')
		install()
	});

blk
	.command('info')
	.option('-d, --debug', 'output extra debugging')
	.action(async () => {
		await test()
		const info = require('./src/commands/info.js')
	});

blk
	.command('send-address [from] [to]')
	.option('--to', 'to address')
	.option('--from', 'from address')
	.action(async (to, from) => {
		await test()
		const sendAddress = require('./src/commands/send-address.js')
	});

blk
	.command('merge-dust')
	.option('-i, --interactive', 'Interactive Mode', 'interactive')
	.action(async (interactive) => {
		await test()
		const mergeDust = require('./src/commands/merge-dust.js')
	});

blk
	.command('unlock')
	.description('Unlock Wallet')
	.action(async () => {
		await test()
		const unlock = require('./src/commands/unlock.js')
	});

blk
	.command('signmessage')
	.action(async (address, message) => {
		await test()
		const signmessage = require('./src/commands/signmessage.js')
		signmessage(address, message)
	});

blk
	.command('verifymessage')
	.action(async (address, signature, message) => {
		await test()
		const verifymessage = require('./src/commands/verifymessage.js')
		verifymessage(address, signature, message)
	});

blk
	.command('encryptwallet')
	.action(async (passphrase) => {
		await test()
		const encryptwallet = require('./src/commands/encryptwallet.js')
	});


/*Query CryptoID*/
const cryptoidWords = `
	Basic: (single argument)
		getblockcount: current block height
		nodes: list of recently seen nodes
		rich: rich list top 1000
		ticker.btc: price in BTC
		ticker.usd: price in USD
		totalcoins: total coins
	Addresses: (second argument is an address)
		addressfirstseen <address>: date and time the address was first seen
		getbalance <address>: balance of the address (~6 hours delay)
		getreceivedbyaddress <address>: amount received by the address (sum of vout)
		richrank <address>: rich list rank for address
	Transactions: (second argument is a txhash)
		lasttxs <txhash>: the last ten transactions (with at least one confirmation), excluding coinbase and stake transactions
		txinfo <txhash>:  summary information about a transaction (confirmations, fees, inputs & output addresses and amounts)
	Blocks: (second argument is height or block hash)
		getblockhash <height>: returns corresponding block hash
		getblocktime <height>: returns unixtime of the block
		getblockheight <hash>: returns corresponding block height
`
blk
	.command('cryptoid <query>')
	.description(cryptoidWords)
	.action(async (query, secondArgument) => {
		const cryptoid = require('./src/commands/cryptoid.js')
		cryptoid(query, secondArgument);
	});



/*Version, Debug, and Parse*/
blk
	.version(version)
	.parse(process.argv)

if (process.argv.length < 3) {
  blk.help();
}