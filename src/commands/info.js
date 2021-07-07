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
	total = wallet.total_balance
	min = (staking.expectedtime / 60).toFixed(2)
	
	btc = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=blackcoin&vs_currencies=btc").then(resp => {
	    data = (resp.data["blackcoin"].btc).toFixed(8)
	    return data
	}).catch(err => {
	  console.log(err)
	})
	btcTotal = (btc * total).toFixed(8)
	usd = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=blackcoin&vs_currencies=usd").then(resp => {
	    data = (resp.data["blackcoin"].usd).toFixed(3)
	    return data
	}).catch(err => {
	  console.log(err)
	})
	usdTotal = (usd * total).toFixed(2)
	eur = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=blackcoin&vs_currencies=eur").then(resp => {
	    data = (resp.data["blackcoin"].eur).toFixed(3)
	    return data
	}).catch(err => {
	  console.log(err)
	})
	eurTotal = (eur * total).toFixed(2)

	hr = (min / 60).toFixed(2)
	day = (hr * 24).toFixed(2)
	month = (day * 30.5).toFixed(2)
	year = (day * 365).toFixed(2)
	annualEarnBTC = (year * 1.5 * btc).toFixed(8)
	annualEarnUSD = (year * 1.5 * usd).toFixed(2)
	annualEarnEUR = (year * 1.5 * eur).toFixed(2)
	annualizedRewardRate = (( year * 1.5 ) / total * 100).toFixed(2)

	console.log(`
	Client Overview:
		Balance: Ⓑ ${wallet.balance} BLK
		Staked Balance: Ⓑ ${wallet.staked_balance} BLK
		Tx Count: Ⓑ ${wallet.txcount} BLK
		Unconfirmed Balance: Ⓑ ${wallet.unconfirmed_balance} BLK
		Immature Balance: Ⓑ ${wallet.immature_balance} BLK
		Total Balance: Ⓑ ${total} BLK
			₿${btcTotal} BTC
			\$${usdTotal} USD
			€${eurTotal} EUR

		Enabled: ${staking.enabled}
		Staking: ${staking.staking}
		Net Stake Weight: ${staking.netstakeweight}
		Expected Stakes per unit of time: 
			${hr}/hr
			${day}/day
			${month}/month
			${year}/year 
			
			Over a year you would earn:
				₿${annualEarnBTC} BTC
				\$${annualEarnUSD} USD
				€${annualEarnEUR} EUR
			Annualized Reward Rate: ${annualizedRewardRate}%

		Connections: ${network.connections}
		Subversion: ${network.subversion}
		Blocks: ${info.blocks}
		Bestblockhash: ${blockchain.bestblockhash}
	`)
}

info() 