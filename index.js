#!/usr/bin/env node
const config = require('./src/depends/blk-config.js');
const blk = require('commander')

blk
	.command('info')
	.option('-d, --debug', 'output extra debugging')
	.action(() => {
		const info = require('./src/commands/info.js')
	});

/*Query CryptoID*/
blk
	.command('cryptoid <query>')
	.description('totalcoins, nodes, tickerUsd, tickerBtc, getblockcount, circulating')
	.action((query) => {
		const cryptoid = require('./src/commands/cryptoid.js')
		cryptoid(query);
	});


blk
	.command('send-address [from] [to]')
	.option('--to', 'to address')
	.option('--from', 'from address')
	.action((to, from) => {
		const sendAddress = require('./src/commands/send-address.js')
	});

blk
	.command('merge-dust')
	.option('-i, --interactive', 'Interactive Mode', 'interactive')
	.action((interactive) => {
		const mergeDust = require('./src/commands/merge-dust.js')
	});

blk
	.command('stake', 'Unlock for Staking Only', 'stake')
	.action(() => {
	});

blk
	.command('unlock', 'Unlock Wallet', 'unlock')
	.action(() => {
	});



/*Version, Debug, and Parse*/
blk
	.version(config.version)
	.parse(process.argv)

