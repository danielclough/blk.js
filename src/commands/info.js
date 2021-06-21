import { getwalletinfo } from '../depends/wallet.js'
import { getstakinginfo } from '../depends/mining.js'
import { getinfo } from '../depends/control.js'
import { getnetworkinfo } from '../depends/network.js'

async function info() {
	let walletInfo = await getwalletinfo().catch(err => {
		console.log('getwalletinfo', err)
	    process.exit(0)
	});

	let stakingInfo = await getstakinginfo().catch(err => {
		console.log('getstakinginfo', err)
	    process.exit(0)
	});

	let info = await getinfo().catch(err => {
		console.log('getinfo', err)
	    process.exit(0)
	});

	let networkInfo = await getnetworkinfo().catch(err => {
		console.log('getnetworkinfo', err)
	    process.exit(0)
	});
}

export default info