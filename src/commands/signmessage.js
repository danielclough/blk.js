const { signmessage } = require('../depends/blackcoin-wallet')

async function signMessage(blackcoinaddress, message) {
	try {
		data = await signmessage(blackcoinaddress, message)
		console.log(data)
	} catch (e) {
	    console.log(e)
	}
}

module.exports = signMessage
