import blackcoin from 'node-blackcoin-more'
import dotenv from 'dotenv'
dotenv.config()

const config = {
	"user": process.env.USER,
	"pass": process.env.PASS,
	"host": process.env.HOST,
	"port": process.env.PORT,
	warn() {
	  if (!this.user || !this.pass || !this.host || !this.port) {
	    console.log(`.env requires host, port, user and pass.`);
	    console.log(`user: ${this.user}, pass: ${this.pass}, host: ${this.host}, port: ${this.port}`)
	    process.exit(0);
	  }
	}
}

export default config