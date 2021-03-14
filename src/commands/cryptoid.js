const axios = require('axios');
const chalk = require('chalk');
let search

cryptoid = function(query, secondArgument) {
	switch (query) {
		case lasttxs || txinfo:
			const searchT = "https://chainz.cryptoid.info/blk/api.dws?q=" + query + "&t=" + secondArgument
		break;
		case addressfirstseen || getbalance || getreceivedbyaddress || richrank:
			const searchA = "https://chainz.cryptoid.info/blk/api.dws?q=" + query + "&a=" + secondArgument
		break;
		case getblockhash || getblocktime:
			const searchHeight = "https://chainz.cryptoid.info/blk/api.dws?q=" + query + "&height=" + secondArgument
		break;
		case getblockheight:
			const searchHash = "https://chainz.cryptoid.info/blk/api.dws?q=" + query + "&hash=" + secondArgument
		break;
		default:
			const search = "https://chainz.cryptoid.info/blk/api.dws?q=" + query

	}
	axios.get(search).then(resp => {
	    console.log(resp.data);
	}).catch(err => {
	  const log = chalk.red(err) // red for errors.
	  console.log(log)
	})
}

module.exports = cryptoid
