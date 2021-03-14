const {getwalletinfo} = require('../depends/blackcoin-wallet')
const {getstakinginfo} = require('../depends/blackcoin-mining')
const {getinfo} = require('../depends/blackcoin-control')
const {getnetworkinfo} = require('../depends/blackcoin-network')

async function info() {
	getwalletinfo()
	getwalletinfo().catch(err => console.log(err));

/*	getstakinginfo()
	getstakinginfo().catch(err => console.log(err));

	getinfo()
	getinfo().catch(err => console.log(err));

	getnetworkinfo()
	getnetworkinfo().catch(err => console.log(err));
	*/
}
info().catch(err => console.log(err));
