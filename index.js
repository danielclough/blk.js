#!/usr/bin/env node
// import pjson from './package.json'
import cryptoid from './src/commands/cryptoid.js'
import blk from 'commander'
import info from './src/commands/info.js'
import sendAddress from './src/commands/send-address.js'
import mergeDust from './src/commands/merge-dust.js'
import unlock from './src/commands/unlock.js'
const version = "0.0.6"

blk
	.command('info')
	.option('-d, --debug', 'output extra debugging')
	.action(() => {
		info().catch(err => console.log(err));
	});

blk
	.command('send-address [from] [to]')
	.option('--to', 'to address')
	.option('--from', 'from address')
	.action((to, from) => {
		sendAddress().catch(err => console.log(err));
	});

blk
	.command('merge-dust')
	.option('-i, --interactive', 'Interactive Mode', 'interactive')
	.action((interactive) => {
		mergeDust().catch(err => console.log(err));
	});

blk
	.command('unlock')
	.description('Unlock Wallet')
	.action(() => {
		unlock().catch(err => console.log(err));
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
	.action((query, secondArgument) => {
		cryptoid(query, secondArgument);
	});



/*Version, Debug, and Parse*/
blk
	.version(version)
	.parse(process.argv)

if (process.argv.length < 3) {
  blk.help();
}
