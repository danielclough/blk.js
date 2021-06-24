const { verifymessage } = require('../depends/blackcoin-util')

async function verifyMessage(obj) {
	try {
		data = await verifymessage(obj)
		console.log(data, obj.args[0], obj.args[1], obj.args[2])
	} catch (e) {
	    console.log(e)
	}
}

module.exports = verifyMessage
