const { verifymessage } = require('../depends/blackcoin-util')
const { getnewaddress } = require('../depends/blackcoin-wallet')

async function verifyMessage(obj) {
	try {
		if (!process.argv[3]) {
			console.log('usage: blk verifymessage "address" "signature" "message"')
			process.exit(0)
		} else {
			data = await verifymessage(obj)
			console.log(data, obj.args[0], obj.args[1], obj.args[2])
		}
	} catch (e) {
	    console.log(e)
	}
}

module.exports = verifyMessage
