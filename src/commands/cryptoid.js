const axios = require('axios');
const chalk = require('chalk');

cryptoid = function(query) {
	const search = "https://chainz.cryptoid.info/blk/api.dws?q=" + query
	axios.get(search).then(resp => {
	    console.log(resp.data);
	}).catch(err => {
	  const log = chalk.red(err) // we set the color red here for errors.
	  console.log(log)
	})
}

module.exports = cryptoid