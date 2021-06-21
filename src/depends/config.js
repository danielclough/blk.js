const blackcoin = require('node-blackcoin-more');
require('dotenv').config()

const config = {
	"rpcuser": process.env.RPCUSER,
	"rpcpassword": process.env.RPCPASSWORD,
	"host": process.env.HOST,
	"port": process.env.PORT,
	warn() {
	  if (!this.rpcuser || !this.rpcpassword || !this.host || !this.port) {
	    console.log(`.env requires host, port, rpcuser and rpcpassword.`);
	    process.exit(0);
	  }
	}
}

module.exports = config