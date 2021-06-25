const blackcoin = require('node-blackcoin-more');
require('dotenv').config();

const config = {
	"user": process.env.RPCUSER,
	"pass": process.env.RPCPASSWORD,
	"host": process.env.HOST,
	"port": process.env.PORT,
	warn() {
	  if (!process.env.RPCUSER || !process.env.RPCPASSWORD || !process.env.HOST || !process.env.PORT) {
	    console.log(`.env requires host, port, rpcuser and rpcpassword.`);
	    process.exit(0);
	  }
	}
}

module.exports = config
