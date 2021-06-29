const { signmessage } = require('../depends/blackcoin-wallet')

async function signMessage(blackcoinaddress, message) {
	try {
		if (!process.argv[2]) {
			console.log('usage: blk signmessage "address" "message"')
			data = await getnewaddress()
			console.log(`Here's a fresh address: \n ${data}`)
			process.exit(0)
		} else {
			data = await signmessage(blackcoinaddress, message)
			console.log(data)
		}
	} catch (e) {
	    console.log(e)
	}
}

module.exports = signMessage
