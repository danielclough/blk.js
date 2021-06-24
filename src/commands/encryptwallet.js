const {encryptwallet, getnewaddress} = require('../depends/blackcoin-wallet')
let passphrase = ""

async function encryptWallet(passphrase) {
	try {
		data = await encryptwallet(passphrase)
		console.log(data)
	} catch (e) {
	    console.log(e)
	}
}
encryptWallet()