import blackcoin from 'node-blackcoin-more'
import dotenv from 'dotenv'
dotenv.config()

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
config.warn()

export default config