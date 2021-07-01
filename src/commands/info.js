const {getwalletinfo} = require('../depends/blackcoin-wallet')
const {getstakinginfo} = require('../depends/blackcoin-mining')
const {getinfo} = require('../depends/blackcoin-control')
const {getnetworkinfo} = require('../depends/blackcoin-network')
const {getblockchaininfo} = require('../depends/blackcoin-blockchain')
const axios = require('axios');

async function info(arg) {
	try {
	  	getInfo()
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
	hrs = staking.expectedtime / 60 / 60
	day = hrs * 24
	total = wallet.total_balance
	btc = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=blackcoin&vs_currencies=btc").then(resp => {
	    data = (resp.data["blackcoin"].btc * total).toFixed(8)
	    return data
	}).catch(err => {
	  console.log(err)
	})
	usd = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=blackcoin&vs_currencies=usd").then(resp => {
	    data = (resp.data["blackcoin"].usd * total).toFixed(3)
	    return data
	}).catch(err => {
	  console.log(err)
	})
	eur = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=blackcoin&vs_currencies=eur").then(resp => {
	    data = (resp.data["blackcoin"].eur * total).toFixed(3)
	    return data
	}).catch(err => {
	  console.log(err)
	})

	console.log(`
	Client Overview:
		balance: ${wallet.balance}
		staked_balance: ${wallet.staked_balance}
		txcount: ${wallet.txcount}
		unconfirmed_balance: ${wallet.unconfirmed_balance}
		immature_balance: ${wallet.immature_balance}
		total_balance: ${total} (${btc} BTC; ${usd} USD; ${eur} EUR)

		enabled: ${staking.enabled}
		staking: ${staking.staking}
		netstakeweight: ${staking.netstakeweight}
		expectedtime: roughly ${hrs} hours per stake ~ ${day} stakes per day

		connections: ${network.connections}
		subversion: ${network.subversion}
		blocks: ${info.blocks}
		bestblockhash: ${blockchain.bestblockhash}
	`)
}

info() 