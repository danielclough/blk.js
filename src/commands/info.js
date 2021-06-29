const config = require('../depends/config.js');
const {getwalletinfo} = require('../depends/blackcoin-wallet')
const {getstakinginfo} = require('../depends/blackcoin-mining')
const {getinfo} = require('../depends/blackcoin-control')
const {getnetworkinfo} = require('../depends/blackcoin-network')
const {getblockchaininfo} = require('../depends/blackcoin-blockchain')

async function info(arg) {
	try {
	  if (!config.user || !config.pass || !config.host || !config.port) {
	  	config.user = await config.getUser()
	  	config.pass = await config.getPass()
	  	config.host = await config.getHost()
	  	config.port = await config.getPort()
	  	getInfo()
	  } else {
	  	getInfo()
	  }
	} catch (e) {
	    console.log(e)
	}
}

const getInfo = async () => {
	wallet = await getwalletinfo()
	staking = await getstakinginfo()
	info = await getinfo()
	network = await getnetworkinfo()
	blockchain = await getblockchaininfo()
	
	console.log(`
	Client Overview:
		balance: ${wallet.balance}
		staked_balance: ${wallet.staked_balance}
		txcount: ${wallet.txcount}
		unconfirmed_balance: ${wallet.unconfirmed_balance}
		immature_balance: ${wallet.immature_balance}
		total_balance: ${wallet.total_balance}

		subversion: ${network.subversion}
		connections: ${network.connections}
		blocks: ${info.blocks}
		enabled: ${staking.enabled}
		staking: ${staking.staking}
		netstakeweight: ${staking.netstakeweight}
		expectedtime: ${staking.expectedtime}
		bestblockhash: ${blockchain.bestblockhash}
	`)
}

info() 